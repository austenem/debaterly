import torch
from textwrap import wrap

# Evaluate an argument using the model
# argument: str - the argument to evaluate
# topic: str - the topic of the argument
# tokenizer: AutoTokenizer - the tokenizer to use
# model: AutoModelForSequenceClassification - the model to use
def evaluateArg(argument, topic, tokenizer, model):
  # split argument into batches of 200 words
  argument = wrap(argument, 200)
  average_score = 0
  
  # for each batch, run the model and get the score
  for arg in argument:
    print('SPLITTING')
    # Define the query
    query = f'### Argument: {arg} ### Topic: {topic}'
    
    # Tokenize the query
    tokenized_query = tokenizer(query, return_tensors="pt")	

    # Pass the tokenized query through the model
    with torch.no_grad():
        outputs = model(**tokenized_query)

    # Extract the predicted score from the model output
    average_score += outputs.logits.item()

  # Average the scores
  average_score /= len(argument)

  # Minimum and maximum values in dataset
  min_val = 0.35
  max_val = 1.05

  # Normalize each value
  normalized_score = round(((average_score - min_val) / (max_val - min_val)) * 100)

  return normalized_score
