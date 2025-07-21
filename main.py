from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from rag import get_answer


app = FastAPI()

#autorise request from front-end
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ask")
async def ask(request: Request):
    data = await request.json()
    question = data.get("question")
    print(f"Question Reçue: {question}")
    answer = get_answer(question)
    return {"answer": answer}
