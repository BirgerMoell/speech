from eliza import Eliza
eliza = Eliza()
eliza.load('doctor.txt')
response = eliza.runFromApi("What is your name?")
#print(response)