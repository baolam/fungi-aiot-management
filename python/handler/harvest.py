from ..manager.js_manager import sio
from ..constant import NAMESPACE

from ..variable import *

def on_update_control(data):
    print(data)

sio.on("on-update-control", handler=on_update_control, namespace=NAMESPACE)