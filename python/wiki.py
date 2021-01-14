import wikipediaapi
from transformers import pipeline
from transformers import T5ForConditionalGeneration, T5Tokenizer

# initialize the model architecture and weights
model = T5ForConditionalGeneration.from_pretrained("t5-base")
# initialize the model tokenizer
tokenizer = T5Tokenizer.from_pretrained("t5-base")

summarization = pipeline("summarization")
wiki_wiki = wikipediaapi.Wikipedia('en')

# page_py = wiki_wiki.page('Consciousness')
# if page_py.exists():
#     print(summarization(page_py.summary))

def getSummary(text):
    page_py = wiki_wiki.page(text)
    if page_py.exists(): 
        wiki_sum = page_py.summary[:1024]
        bert_summary = summarization(wiki_sum)[0]['summary_text']
        print(bert_summary)
        return bert_summary
    else:
        print("no page found")
        return False
    
def getT5Summary(text):
    page_py = wiki_wiki.page(text)
    if page_py.exists(): 
        wiki_sum = page_py.summary[:1024]
        inputs = tokenizer.encode("summarize: " + wiki_sum, return_tensors="pt", max_length=1024, truncation=True)
        # generate the summarization output
        outputs = model.generate(
            inputs, 
            max_length=150, 
            min_length=40, 
            length_penalty=2.0, 
            num_beams=4, 
            early_stopping=True)
        # just for debugging
        print(outputs)
        print(tokenizer.decode(outputs[0]))
        #bert_summary = summarization(wiki_sum)
        #print(bert_summary)
        return tokenizer.decode(outputs[0])
    else:
        return False


# answer = getSummary("love")
# print(answer)