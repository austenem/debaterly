import torch
from textwrap import wrap

# Evaluate an argument using the model
# argument: str - the argument to evaluate
# topic: str - the topic of the argument
# tokenizer: AutoTokenizer - the tokenizer to use
# model: AutoModelForSequenceClassification - the model to use
def evaluateArg(argument, topic, tokenizer, model):
  # Minimum and maximum values in dataset
  min_val = 0.35
  max_val = 1.05

  # List to store scores
  scores = []
  
  # for each batch, run the model and get the score
  for arg in argument:

    if len(arg) == 0:
      continue

    # Define the query
    query = f'### Argument: {arg.strip()} ### Topic: {topic}'
    
    # Tokenize the query
    tokenized_query = tokenizer(query, return_tensors="pt")	

    # Pass the tokenized query through the model
    with torch.no_grad():
        outputs = model(**tokenized_query)

    # Extract the predicted score from the model output and add to list
    normalized_score = round(((outputs.logits.item() - min_val) / (max_val - min_val)) * 100)
    scores.append(normalized_score)

  # Average the scores
  average_score = round(sum(scores) / len(scores))

  print(f"Average score: {average_score}")
  print("Scores:") 

  return average_score, scores
