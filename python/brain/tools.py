# Default using query engine
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.prompts import PromptTemplate
from ..constant import THRESHOLD_DIAGNOSE_DISEASE
from .documents import general_tool, diagnose_tool, llm

retrieve_template = PromptTemplate("""
    Bạn trả về truy vấn dựa trên vụ mùa được cung cấp {harvest_id}. \n
                                     
    Truy vấn: {query_str}. \n
""")

qa_template = PromptTemplate("""
    Bạn là một trợ lí nông nghiệp có khả năng trả lời các thông tin truy vấn về mùa vụ được phụ trách. \n
                             
    Bạn hãy trả lời truy vấn của người dùng theo ID của mùa vụ được cung cấp {harvest_id}. \n
                             
    Ngoài ra hãy trả lời dựa trên thông tin lấy được từ ngữ cảnh {context_str}\n.                  
    
    Hãy chắc chắn khi trả lời, bạn nắm rõ các lưu ý:
    Lưu ý, nếu stageId là 0 nghĩa là chưa có giai đoạn nào được gán cho vụ mùa. Nếu diseaseId là 0 \
    nghĩa là vụ mùa hiện tại không mắc bệnh nào hết. Thông tin liên quan đến ID chỉ dùng cho định hướng tìm kiếm, \ 
    không dùng cho kết quả trả lời. Chỉ một kịch bản (Script) được thực thi. \n    
    
    Hãy trả lời mà không dùng định dạng markdown. \n
                             
    Đây là truy vấn: {query_str}. \n
                             
    Trả lời:
""")

general_retriever = general_tool.as_retriever(similarity_top_k=3)
disease_retriever = diagnose_tool.as_retriever(similarity_top_k=3)
query_engine = RetrieverQueryEngine(general_retriever)

def query(harvest_id, request):
    request_format = retrieve_template.format(
        harvest_id=harvest_id,
        query_str=request
    )

    nodes = general_retriever.retrieve(request_format)
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