from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
from generate import gpt2generator
from wiki import getSummary
from starlette.middleware.cors import CORSMiddleware

class GenerateRequest(BaseModel):
    text: str

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://127.0.0.1:8000/",
    "https://ai.homelearning.se"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
async def generate_response(generateRequest: GenerateRequest):
    #print("inside with item", generateRequest)
    response = gpt2generator(generateRequest.text)
    #print("the response is", response)
    return {
        "text": response }


@app.post("/summary")
async def summary(generateRequest: GenerateRequest):
    #print("inside with item", generateRequest)
    response = getSummary(generateRequest.text)
    #print("the response is", response)
    return {
        "text": response }
