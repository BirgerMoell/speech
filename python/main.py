from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
from generate import gpt2generator
from wiki import getSummary
from generate_image import generate_image
from starlette.middleware.cors import CORSMiddleware
from eliza import Eliza
import uuid

class GenerateRequest(BaseModel):
    text: str

app = FastAPI()

from fastapi.staticfiles import StaticFiles
app.mount("/images", StaticFiles(directory="images", html=True), name="images")

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

eliza = Eliza()
eliza.load('doctor.txt')

@app.post("/generate")
async def generate_response(generateRequest: GenerateRequest):
    #print("inside with item", generateRequest)
    response = gpt2generator(generateRequest.text)
    #print("the response is", response)
    return {
        "text": response }

@app.post("/generate_image")
async def generate_image_response(generateRequest: GenerateRequest):
    print("inside with item", generateRequest)
    prompt = generateRequest.text
    print("generate based on the prompt", prompt)
    image_response = generate_image(prompt, "images/" + prompt + str(uuid.uuid4()) + ".png")
    print("the response is", image_response)
    return {
        "text": image_response }

@app.post("/eliza")
async def generate_response(generateRequest: GenerateRequest):
    response = eliza.runFromApi(generateRequest.text)
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
