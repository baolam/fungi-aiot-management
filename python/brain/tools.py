# Default using query engine
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.prompts import PromptTemplate
from ..constant import THRESHOLD_DIAGNOSE_DISEASE
from .documents import general_tool, diagnose_tool, llm

retrieve_template = PromptTemplate("""
Tìm thông tin liên quan đến vụ mùa có ID: {harvest_id}, dựa trên truy vấn sau: {query_str}
""")

qa_template = PromptTemplate("""
Bạn là một trợ lý nông nghiệp, có nhiệm vụ cung cấp thông tin về mùa vụ dựa theo ID vụ mùa được cung cấp: {harvest_id}.

Bạn cần trả lời dựa vào thông tin ngữ cảnh sau: {context_str}.

Lưu ý quan trọng:
- Nếu stageId bằng 0, nghĩa là mùa vụ chưa có giai đoạn nào được gán.
- Nếu diseaseId bằng 0, nghĩa là mùa vụ hiện tại không mắc bệnh nào.
- Các ID như harvest_id, stageId, diseaseId chỉ được dùng để tra cứu thông tin, không đưa vào nội dung trả lời.
- Chỉ một kịch bản (Script) được thực thi trong một vụ mùa ứng theo giai đoạn, loại bệnh và loại nấm trồng.

Vui lòng trả lời câu hỏi một cách tự nhiên, chính xác và không sử dụng định dạng Markdown.

Truy vấn của người dùng: {query_str}

Câu trả lời:
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