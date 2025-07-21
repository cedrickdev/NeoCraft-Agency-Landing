from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from rag import get_answer, rebuild_index


app = FastAPI()

#autorise request from front-end
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/askNeochat")
async def ask(request: Request):
    data = await request.json()
    question = data.get("question")
    answer = get_answer(question)
    return {"answer": answer}

@app.post("/reload") # rebuild the index of the RAG database to avoid memory issues
def reload():
    vectorStore = rebuild_index()
    return {"message": "la base de connaissances a été rechargée avec succès"}
