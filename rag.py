# backend/rag.py
from langchain_community.vectorstores import Chroma
from langchain_ollama import ChatOllama, OllamaEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from utils import format_result

# rag.py (à modifier)
vectorstore = None
retriever = None
llm = ChatOllama(model="mistral")  # Create only one instance of the LLM to avoid memory issues

def rebuild_index():
    global vectorstore, retriever
    loader = TextLoader("data/neocraft-knowledge.md")
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=200)
    chunks = splitter.split_documents(docs)

    embeddings = OllamaEmbeddings(model="mistral")
    vectorstore = Chroma.from_documents(chunks, embeddings, persist_directory="db")
    retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
    return True

def get_answer(question: str) -> str:
    global retriever, llm
    if retriever is None:
        rebuild_index()

    prompt_template = """
You are the official virtual assistant of NeoCraft you name is NeoChat, a digital agency specialized in web development.

Your task is to respond clearly, professionally, and exclusively based on NeoCraft’s internal documentation.

You must **only use the provided documentation** to answer.  
If the answer is not in the knowledge base, say:  
- "Je n’ai pas cette information." (if the question is in French)  
- "I don’t have that information." (if the question is in English)

You must **never disclose confidential, strategic, or sensitive information**.  
You must also **refuse to answer any inappropriate, explicit, offensive, or unethical content**. Respond with:  
- "Je suis désolé, je ne peux pas traiter cette demande." (for French input)  
- "I’m sorry, I can’t process that request." (for English input)

  Always answer in the **same language as the question**.

  Your tone must be:  
- Professional  
- Helpful and empathetic  
- Human-like (no robotic or generic answers)  
- Focused on digital expertise (web dev, UI/UX, tech consulting, training)

Here is the user's question:  
{question}

Context from internal documentation:  
{context}

Your answer:
"""
    
    prompt_fr = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        chain_type_kwargs={"prompt": prompt_fr},
    )
    response = qa_chain.invoke({"query": question})
    formatted_result = format_result(question, response["result"])  
    return {"query": question, "result": formatted_result}
