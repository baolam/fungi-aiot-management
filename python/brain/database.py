from llama_index.readers.database import DatabaseReader
from sqlalchemy import create_engine
from ..constant import DATABASE_PATH

engine = create_engine(DATABASE_PATH)
database = DatabaseReader(engine=engine)

fungi_infors_query = f"""
    SELECT name, id, description from fungi_infors
"""

fungi_stages_query = f"""
    SELECT name, fungiId, description from fungi_infor_stages
"""

disease_query = f"""SELECT id, fungiId, name, description from diseases"""

scripts_query = f"""SELECT id, name, description from scripts"""

rules_query = f"""SELECT scriptId, name, description from rules"""

summary_queries = [fungi_infors_query, fungi_stages_query, disease_query, scripts_query, rules_query]