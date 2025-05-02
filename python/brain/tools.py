# Default using query engine
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.prompts import PromptTemplate
from ..constant import THRESHOLD_DIAGNOSE_DISEASE
from .documents import general_tool, diagnose_tool, llm

qa_template = PromptTemplate("""
    Bạn là một trợ lí nông nghiệp có khả năng trả lời các thông tin truy vấn về mùa vụ được phụ trách. \n
    Bạn hãy trả lời truy vấn của người dùng theo ID của mùa vụ được cung cấp {harvest_id} và dựa trên thông tin lấy được từ ngữ cảnh {context_str} \n.
    Đây là truy vấn: {query_str}. \n
    Trả lời:
""")

general_retriever = general_tool.as_retriever()
disease_retriever = diagnose_tool.as_retriever(similarity_top_k=3)
query_engine = RetrieverQueryEngine(general_retriever)

def query(harvest_id, request):
    nodes = general_retriever.retrieve(request)
    context_str = "\n".join([node.get_content() for node in nodes])

    response = llm.predict(qa_template, query_str=request, context_str=context_str, harvest_id=harvest_id)
    return response

def diagnose_disease(sympthons):
    nodes = disease_retriever.retrieve(sympthons)

    hash_key = set()
    output = []

    for node in nodes:
        _id = node.metadata["id"]
        if _id not in hash_key:
            if node.get_score() >= THRESHOLD_DIAGNOSE_DISEASE:
                hash_key.add(_id)
                output.append((_id, f'{node.get_score() * 100:.2f}'))

    return output