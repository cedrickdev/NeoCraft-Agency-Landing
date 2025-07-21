# backend/rag.py
from langchain.vectorstores import Chroma
from langchain.embeddings import OllamaEmbeddings
from langchain.llms import Ollama
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import TextLoader
from langchain.chains import RetrievalQA

def get_answer(question: str) -> str:
    loader = TextLoader("data/neocraft-knowledge.md", encoding='utf-8')
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(docs)

    embeddings = OllamaEmbeddings(model="mistral")
    vectorstore = Chroma.from_documents(chunks, embeddings, persist_directory="db")

    retriever = vectorstore.as_retriever()
    llm = Ollama(model="mistral")

    qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
    return qa_chain.run(question)
