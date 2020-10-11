import tensorflow as tf
from transformers import TFGPT2LMHeadModel, GPT2TokenizerFast
tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")
model = TFGPT2LMHeadModel.from_pretrained("gpt2", pad_token_id=tokenizer.eos_token_id)

def gpt2generator(text):
    #text = "-" + text + "?\n-:"
    #print("the text inside gpt")
    #print(text)
    input_ids = tokenizer.encode(text, return_tensors='tf')
    sample_outputs = model.generate(
    input_ids,
    do_sample=True, 
    max_length=50, 
    top_k=50, 
    top_p=0.95, 
    num_return_sequences=1
    )
    print("Output:\n" + 100 * '-')
    response = tokenizer.decode(sample_outputs[0], skip_special_tokens=True)[len(text):]
    if ("." in response):
        return response.split(".")[0]
    elif ("!" in response):  
        return response.split("!")[0]
    elif ("-" in response):  
        return response.split("-")[0]
    else:
        return response

# wordy_words = gpt2generator("I am a robot")
# print(wordy_words)