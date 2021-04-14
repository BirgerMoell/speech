import os
import openai
from dotenv import load_dotenv
import pdb

load_dotenv('.env')

openai.api_key = os.getenv("OPEN_AI_API_KEY")
completion = openai.Completion()

start_chat_log = ''' The following is a conversation with a friendly, compassionate AI assistant. The assistant will answer all your questions about female reproductive health

Human: Hello, who are you?
AI: I am an AI created by Grace Health. How can I help you today?
'''

start_chat_log_psychologist = ''' The following is a conversation with a friendly, compassionate AI psychologist. The psychologist is trained in cognitive behavioural therapy and will help you deal with mental health issues.

Human: Hello, who are you?
AI: I am an AI psychologist trained in helping people overcome mental health problems. How come you are talking with me today?
'''



start_sequence = "\nAI:"
restart_sequence = "\nHuman: "

# response = openai.Completion.create(
#   engine="davinci",
#   prompt="The following is a conversation with an AI assistant.",
#   temperature=0.9,
#   max_tokens=150,
#   top_p=1,
#   frequency_penalty=0,
#   presence_penalty=0.6,
#   stop=["\n", " Human:", " AI:"]
# )
# pdb.set_trace()

def ask(question, chat_log=None):
    if chat_log is None:
        chat_log = start_chat_log
    prompt = f'{chat_log}Human: {question}\nAI:'
    response = completion.create(
        prompt=prompt, engine="davinci", stop=['\nHuman'], temperature=0.9,
        top_p=1, frequency_penalty=0, presence_penalty=0.6, best_of=1,
        max_tokens=150)
    answer = response.choices[0].text.strip()
    return answer

def ask_psychologist(question, start_chat_log_psychologist, chat_log=None):
    if chat_log is None:
        chat_log = start_chat_log_psychologist
    prompt = f'{chat_log}Human: {question}\nAI:'
    response = completion.create(
        prompt=prompt, engine="davinci", stop=['\nHuman'], temperature=0.9,
        top_p=1, frequency_penalty=0, presence_penalty=0.6, best_of=1,
        max_tokens=150)
    answer = response.choices[0].text.strip()
    return answer


