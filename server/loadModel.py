from transformers import AutoTokenizer, AutoModelForSequenceClassification

model_repo = "austenem/arg-quality-regression"

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(model_repo)
model = AutoModelForSequenceClassification.from_pretrained(model_repo, num_labels=1)
