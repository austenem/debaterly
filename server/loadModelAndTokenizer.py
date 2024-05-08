from transformers import AutoTokenizer, AutoModelForSequenceClassification

def loadModelAndTokenizer(repo: str):
  # Load tokenizer and model
  tokenizer = AutoTokenizer.from_pretrained(repo)
  model = AutoModelForSequenceClassification.from_pretrained(repo, num_labels=1)

  return tokenizer, model
