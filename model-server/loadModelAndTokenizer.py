from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Load tokenizer and model
# repo: str - the repository to load the model and tokenizer from
# returns: AutoTokenizer, AutoModelForSequenceClassification - the tokenizer 
#          and model loaded from the repository
def loadModelAndTokenizer(repo: str):
  # Load tokenizer and model
  tokenizer = AutoTokenizer.from_pretrained(repo)
  model = AutoModelForSequenceClassification.from_pretrained(repo, num_labels=1)

  return tokenizer, model
