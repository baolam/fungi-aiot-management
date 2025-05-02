from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.gemini import Gemini
from llama_index.core import Settings

from ..constant import EMBED_MODEL_NAME, GOOGLE_API_KEY

print("Initalize model")
llm = Gemini(api_key=GOOGLE_API_KEY)
embed_model = HuggingFaceEmbedding(model_name=EMBED_MODEL_NAME)
print("Finished initalize model!")

Settings.embed_model = embed_model
Settings.llm = llm

from .database import summary_queries, database, disease_query
from ..constant import BUILT_STORAGE, VECTOR_STORAGE, DIAGNOSE_DISEASE_STORAGE

from llama_index.core.node_parser import SemanticSplitterNodeParser
from llama_index.core.ingestion import IngestionPipeline
from llama_index.core import VectorStoreIndex, load_index_from_storage, StorageContext

pipeline = IngestionPipeline("Default pipeline", transformations=[
    SemanticSplitterNodeParser(include_metadata=True, buffer_size=2, breakpoint_percentile_threshold=80, embed_model=embed_model)
])

def build_overall():
    print("Trying to build overall documents...")
    documents = []
    for query in summary_queries:
        documents += database.load_data(query)
    print("Build document successfully!")
    nodes = pipeline.run(documents=documents, show_progress=True)
    VectorStoreIndex(nodes).storage_context.persist(VECTOR_STORAGE)

def build_diagnose_disease():
    documents = database.load_data(disease_query, metadata_cols=["id"])
    nodes = pipeline.run(documents=documents, show_progress=True)
    VectorStoreIndex(nodes).storage_context.persist(DIAGNOSE_DISEASE_STORAGE)

# Build documents from data
if not BUILT_STORAGE:
    print("Program didn't build document!")
    build_overall()
    build_diagnose_disease()
    print("Build nodes successfully!")
    print("Remember to set BUILT_STORAGE in config.env file to 1!")
else:
    print("Document built!")


general_tool : VectorStoreIndex = load_index_from_storage(StorageContext.from_defaults(persist_dir=VECTOR_STORAGE))
diagnose_tool : VectorStoreIndex = load_index_from_storage(StorageContext.from_defaults(persist_dir=DIAGNOSE_DISEASE_STORAGE)) 