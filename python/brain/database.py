from llama_index.readers.database import DatabaseReader
from sqlalchemy import create_engine
from ..constant import DATABASE_PATH

engine = create_engine(DATABASE_PATH)
database = DatabaseReader(engine=engine)