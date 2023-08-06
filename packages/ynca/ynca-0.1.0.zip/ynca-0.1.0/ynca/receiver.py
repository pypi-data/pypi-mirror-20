import threading
import logging

from .constants import DSP_SOUND_PROGRAMS, Mute
from .helpers import number_to_string_with_stepsize
from .connection import YncaConnection, YncaProtocolStatus

logger = logging.getLogger(__name__)

ALL_ZONES = ["MAIN", "ZONE2", "ZONE3", "ZONE4"]

# Map subunits to input names, this is used for discovering what inputs are available
# Inputs missing because unknown what subunit they map to: NET
SUBUNIT_INPUT_MAPPINGS = {
    "TUN": "TUNER",
    "SIRIUS": "SIRIUS",
    "IPOD": "iPod",
    "BT": "Bluetooth",
    "RHAP": "Rhapsody",
    "SIRIUSIR": "SIRIUS InternetRadio",
    "PANDORA": "Pandora",
    "NAPSTER": "Napster",
    "PC": "PC",
    "NETRADIO": "NET RADIO",
    "IPODUSB": "iPod (USB)",
    "UAW": "UAW",
}


class YncaReceiver:

    def __init__(self, port, on_update=None):
        """
        Constructor for a Receiver object.

        Communicates with the device to determine capabilities.
        This is a long running function!

        Most useful functionality is available through the zones.
        """
        self._initialized_event = threading.Event()
        self._on_update_callback = None  # None to avoid update callbacks during initialization
        self._zones_to_initialize = []

        self.model_name = None
        self.firmware_version = None
        self.zones = {}
        self.inputs = {}
        self._connection = YncaConnection(port, self._connection_update)
        self._connection.connect()

        self._initialize_device()

        self._on_update_callback = on_update
        if self._on_update_callback:  # All changed after initialization
            self._on_update_callback()

    def __str__(self):
        output = []
        for key in self.__dict__:
            output.append("{key}={value}".format(key=key, value=self.__dict__[key]))

        return '\n'.join(output)

    def _initialize_device(self):
        """ Communicate with the device to setup initial state and discover capabilities """
        logger.info("Receiver initialization start.")
        self._connection.get("SYS", "MODELNAME")

        # Get user-friendly names for inputs (also allows detection of available inputs)
        # Note that these are not all inputs, just the external ones it seems
        self._connection.get("SYS", "INPNAME")

        # A device also can have a number of 'internal' inputs like the Tuner, USB, Napster etc..
        # There is no way to get which of there inputs are supported by the device so just try all that we know of
        for subunit in SUBUNIT_INPUT_MAPPINGS:
            self._connection.get(subunit, "AVAIL")

        # There is no way to get which zones are supported by the device to just try all possible
        # The callback will create any zone instances on success responses
        for zone in ALL_ZONES:
            self._connection.get(zone, "AVAIL")

        self._connection.get("SYS", "VERSION")  # Use version as a "sync" command
        if not self._initialized_event.wait(10):  # Each command is 100ms (at least) and a lot are sent\
            logger.error("Receiver initialization phase 1 failed!")

        # Initialize the zones (constructors are synchronous)
        for zone in self._zones_to_initialize:
            logger.info("Initializing zone {}.".format(zone))
            self.zones[zone] = YncaZone(zone, self._connection)
            self.zones[zone].initialize()
        self._zones_to_initialize = None

        logger.info("Receiver initialization done.")

    def _connection_update(self, status, subunit, function, value):
        if status == YncaProtocolStatus.OK:
            updated = False
            if subunit == "SYS":
                updated = self._sys_update(function, value)
            elif subunit in self.zones:
                updated = self.zones[subunit].update(function, value)
            elif subunit in ALL_ZONES:
                self._zones_to_initialize.append(subunit)

            elif function == "AVAIL":
                if subunit in SUBUNIT_INPUT_MAPPINGS:
                    self.inputs[SUBUNIT_INPUT_MAPPINGS[subunit]] = SUBUNIT_INPUT_MAPPINGS[subunit]

            if updated and self._on_update_callback:
                self._on_update_callback()

    def _sys_update(self, function, value):
        updated = True
        if function == "MODELNAME":
            self.model_name = value
        elif function == "VERSION":
            self.firmware_version = value
            self._initialized_event.set()
        elif function.startswith("INPNAME"):
            input_id = function[7:]
            self.inputs[input_id] = value
        else:
            updated = False

        return updated


class YncaZone:
    def __init__(self, zone, connection):
        self._initialized_event = threading.Event()
        self._connection = connection
        self._subunit = zone

        self._name = None
        self._max_volume = 16.5
        self._input = None
        self._power = False
        self._volume = None
        self._mute = None
        self._dsp_sound_program = None
        self._scenes = {}

    def initialize(self):
        """
        Initialize the Zone based on capabilities of the device.
        This is a long running function!
        """
        self._get("BASIC")  # Gets PWR, SLEEP, VOL, MUTE, INP, STRAIGHT, ENHANCER and SOUNDPRG (if applicable)
        self._get("MAXVOL")
        self._get("SCENENAME")
        self._get("ZONENAME")

        if not self._initialized_event.wait(2):  # Each command takes at least 100ms + big margin
            logger.error("Zone initialization failed!")

    def __str__(self):
        output = []
        for key in self.__dict__:
            output.append("{key}={value}".format(key=key, value=self.__dict__[key]))

        return '\n'.join(output)

    def _put(self, function, value):
        self._connection.put(self._subunit, function, value)

    def _get(self, function):
        self._connection.get(self._subunit, function)

    def update(self, function, value):
        updated = True

        handler = getattr(self, "_handle_{}".format(function.lower()), None)
        if handler is not None:
            handler(value)
        elif len(function) == 10 and function.startswith("SCENE") and function.endswith("NAME"):
            scene_id = int(function[5:6])
            self._scenes[scene_id] = value
        else:
            updated = False

        return updated

    def _handle_inp(self, value):
        self._input = value

    def _handle_vol(self, value):
        self._volume = float(value)

    def _handle_maxvol(self, value):
        self._max_volume = float(value)

    def _handle_mute(self, value):
        if value == "Off":
            self._mute = Mute.off
        elif value == "Att -20dB":
            self._mute = Mute.att_minus_20
        elif value == "Att -40dB":
            self._mute = Mute.att_minus_40
        else:
            self._mute = Mute.on

    def _handle_pwr(self, value):
        if value == "On":
            self._power = True
        else:
            self._power = False

    def _handle_zonename(self, value):
        self._name = value
        self._initialized_event.set()

    def _handle_soundprg(self, value):
        self._dsp_sound_program = value

    @property
    def name(self):
        """Get zone name"""
        return self._name

    @property
    def on(self):
        """Get current on state"""
        return self._power

    @on.setter
    def on(self, value):
        """Turn on/off zone"""
        assert value in [True, False]  # Is this usefull?
        self._put("PWR", "On" if value is True else "Standby")

    @property
    def mute(self):
        """Get current mute state"""
        return self._mute

    @mute.setter
    def mute(self, value):
        """Mute"""
        assert value in Mute  # Is this usefull?
        command_value = "On"
        if value == Mute.off:
            command_value = "Off"
        elif value == Mute.att_minus_40:
            command_value = "Att -40 dB"
        elif value == Mute.att_minus_20:
            command_value = "Att -20 dB"
        self._put("MUTE", command_value)

    @property
    def max_volume(self):
        """Get maximum volume in dB"""
        return self._max_volume

    @property
    def volume(self):
        """Get current volume in dB"""
        return self._volume

    @volume.setter
    def volume(self, value):
        """Set volume in dB. The receiver only works with 0.5 increments. Input values will be round."""
        self._put("VOL", number_to_string_with_stepsize(value, 1, 0.5))

    def volume_up(self, step_size=0.5):
        """
        Increase the volume with given stepsize.
        Supported stepsizes are: 0.5, 1, 2 and 5
        """
        value = "Up"
        if step_size in [1, 2, 5]:
            value = "Up {} dB".format(step_size)
        self._put("VOL", value)

    def volume_down(self, step_size=0.5):
        """
        Decrease the volume with given stepsize.
        Supported stepsizes are: 0.5, 1, 2 and 5
        """
        value = "Down"
        if step_size in [1, 2, 5]:
            value = "Down {} dB".format(step_size)
        self._put("VOL", value)

    @property
    def input(self):
        """Get current input"""
        return self._input

    @input.setter
    def input(self, value):
        """Set input"""
        self._put("INP", value)

    @property
    def dsp_sound_program(self):
        """Get the current DSP sound program"""
        return self._dsp_sound_program

    @dsp_sound_program.setter
    def dsp_sound_program(self, value):
        """Set the DSP sound program"""
        if value in DSP_SOUND_PROGRAMS:
            self._put("SOUNDPRG", value)
        else:
            raise ValueError("Soundprogram not in DspSoundPrograms")

    def activate_scene(self, scene_id):
        """Activate a scene"""
        if len(self._scenes) == 0:
            raise ValueError("Zone does not support scenes")
        elif scene_id not in [1, 2, 3, 4]:
            raise ValueError("Invalid scene ID, should et 1, 2, 3 or 4")
        else:
            self._put("SCENE=Scene {}", scene_id)

