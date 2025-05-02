from ..constant import NAMESPACE
from ..variable import js_sio
from ..brain.tools import diagnose_disease, query

def on_diagnose_disease(data):
    try:
        symptons = data["symptons"]
        resp = diagnose_disease(symptons)
    except Exception as e:
        print(e)
        resp = []
    js_sio.emit("diagnose-disease-result", resp, namespace=NAMESPACE)

def on_query(data):
    harvest_id = data["harvestId"]
    js_sio.emit("query-result", {
        "harvestId" : harvest_id,
        "response" : query(harvest_id, data["query"])
    }, namespace=NAMESPACE)

js_sio.on("diagnose-disease", handler=on_diagnose_disease, namespace=NAMESPACE)
js_sio.on("query", handler=on_query, namespace=NAMESPACE)