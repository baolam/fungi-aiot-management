import sqlite3
from skfuzzy.control import Rule
from ..constant import DATABASE_NAME
from ..variable import temperature, humidity, light, control_levels, fan_speed, brightness

conn = sqlite3.connect(DATABASE_NAME)

def retrieve_rules():
    query_str = "SELECT * FROM rules"
    cursor = conn.cursor()
    cursor.execute(query_str)

    _result = {}

    _rules = cursor.fetchall()

    for _id, __, __, __, input_rule, output_rule, __, __ in _rules:
        # print(f"_id: {_id}, input_rule: {input_rule}, output_rule: {output_rule}")
        _result[_id] = Rule(eval(input_rule), eval(output_rule))

    return _result

def disconnect_to_db():
    conn.close()

##### Tiến hành thực thi lấy các Rule đã lưu trữ
# print("Retrievint rules from database!")
# fuzzy_rules = retrieve_rules()
# retrieve_rules()
# print("Retrieve rules successfully!")