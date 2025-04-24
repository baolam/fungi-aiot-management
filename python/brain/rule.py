import sqlite3
from ..constant import *

conn = sqlite3.connect(DATABASE_NAME)

def retrieve_rules():
    query_str = "SELECT * FROM rules"
    cursor = conn.cursor()
    cursor.execute(query_str)

    _rules = cursor.fetchall()
    print(_rules)

def disconnect_to_db():
    conn.close()