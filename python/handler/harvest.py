from ..manager.js_manager import sio
from ..constant import NAMESPACE
from ..variable import *
from skfuzzy.control import ControlSystemSimulation, ControlSystem

def on_harvest_initalize(data):
    try:
        global harvest, fuzzy_rules
        _harvest = data["harvest"]
        rules = data["rules"]

        interpret_rules = [fuzzy_rules[rule] for rule in rules]
        
        system = ControlSystem(interpret_rules)
        harvest[_harvest] = {
            "system" : ControlSystemSimulation(system)
        }

        print(f"Initalized control system for device responsed for harvest {_harvest} successfully!")
    except Exception as e:
        print(e)
        print(f"Initalized control system for device responsed for harvest {_harvest} unsuccessfully!")

sio.on("harvest-initalize", handler=on_harvest_initalize, namespace=NAMESPACE)