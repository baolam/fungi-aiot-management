from llama_index.readers.database import DatabaseReader
from sqlalchemy import create_engine
from ..constant import DATABASE_PATH

engine = create_engine(DATABASE_PATH)
database = DatabaseReader(engine=engine)

fungi_infors_query = f"""
    SELECT name, id, description from fungi_infors
"""

fungi_stages_query = f"""
    SELECT id AS stageId, name, fungiId, time as timeOfStage, description from fungi_infor_stages
"""

default_disease_query = f"""SELECT id, fungiId, name, description from diseases"""
disease_query = f"""SELECT id AS diseaseId, fungiId, name, description from diseases"""

scripts_query = f"""SELECT id AS scriptId, name, description from scripts"""

rules_query = f"""SELECT scriptId, name, description from rules"""

harvests_query = f"""SELECT id as harvestId, fungiId, current_stage as stageId, current_disease as diseaseId from harvests"""

summary_queries = [fungi_infors_query, fungi_stages_query, disease_query, scripts_query, rules_query, harvests_query]