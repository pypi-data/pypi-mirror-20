from raspyrfm_client.device import actions
from raspyrfm_client.device.base import Device


class HX2262Compatible(Device):
    _lo = "1,"
    _hi = "3,"
    _seqLo = _lo + _hi + _lo + _hi
    _seqHi = _hi + _lo + _hi + _lo
    _seqFl = _lo + _hi + _hi + _lo
    _on = _seqLo + _seqFl
    _off = _seqFl + _seqLo

    _tx433version = "1,"

    _s_speed_connair = "14"
    _head_connair = "TXP:0,0,10,5600,350,25,"
    _tail_connair = _tx433version + _s_speed_connair + ";"

    _s_speed_itgw = "32,"
    _head_itgw = "0,0,10,11200,350,26,0,"
    _tail_itgw = _tx433version + _s_speed_itgw + "0"

    _dips = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

    def __init__(self):
        from raspyrfm_client.device.manufacturer import manufacturer_constants
        super(HX2262Compatible, self).__init__(manufacturer_constants.UNIVERSAL, manufacturer_constants.HX2262)

    def set_channel_config(self, **channel_arguments) -> None:
        """
        :param channel_arguments: dips=[boolean]
        """
        for dip in self._dips:
            if dip not in channel_arguments:
                raise ValueError("arguments should contain key \"" + str(dip) + "\"")

        self._channel = channel_arguments

    def get_supported_actions(self) -> [str]:
        return [actions.ON, actions.OFF]

    def generate_code(self, action: str) -> str:
        dips = self.get_channel_config()
        if dips is None:
            raise ValueError("Missing channel configuration :(")

        if action not in self.get_supported_actions():
            raise ValueError("Unsupported action: " + action)

        seq = ""

        for dip in self._dips:
            dip_value = str(self.get_channel_config()[dip]).lower()
            if dip_value.lower() is 'f':
                seq += self._seqFl
            elif dip_value.lower() is '0':
                seq += self._seqLo
            elif dip_value.lower() is '1':
                seq += self._seqHi
            else:
                raise ValueError(
                    "Invalid dip value \"" + dip_value + "\"! Must be one of ['0', '1', 'f'] (case insensitive)")

        if action is actions.ON:
            return self._head_connair + seq + self._on + self._tail_connair
        elif action is actions.OFF:
            return self._head_connair + seq + self._off + self._tail_connair
        else:
            raise ValueError("Invalid action")
