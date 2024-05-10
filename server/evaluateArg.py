import torch

# Evaluate an argument using the model
# argument: str - the argument to evaluate
# topic: str - the topic of the argument
# tokenizer: AutoTokenizer - the tokenizer to use
# model: AutoModelForSequenceClassification - the model to use
def evaluateArg(argument, topic, tokenizer, model):


  # Define the query
  query = f'### Argument: {argument} ### Topic: {topic}'
  
  # Tokenize the query
  tokenized_query = tokenizer(query, return_tensors="pt")	

  # Pass the tokenized query through the model
  with torch.no_grad():
      outputs = model(**tokenized_query)

  # Extract the predicted score from the model output
  predicted_score = outputs.logits.item()

  # Minimum and maximum values in dataset
  min_val = 0.35
  max_val = 1.05

  # Normalize each value
  normalized_score = round(((predicted_score - min_val) / (max_val - min_val)) * 100)

  return normalized_score
