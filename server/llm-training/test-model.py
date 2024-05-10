from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import pandas as pd

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("austenem/arg-quality-regression")
model = AutoModelForSequenceClassification.from_pretrained("austenem/arg-quality-regression", num_labels=1)

df = pd.read_csv('testing_raw_dataset.csv')

# testing variables
average_prediction_difference = 0 # average difference between predicted and actual score
lowest_predicted_score = 1
highest_predicted_score = 0

prediction_col = []
for _, row in df.iterrows():
    query = str(row['text'])
    score = row['labels']

    # Tokenize the query
    tokenized_query = tokenizer(query, return_tensors="pt")

    # Pass the tokenized query through the model
    with torch.no_grad():
        outputs = model(**tokenized_query)

    # Extract the predicted score from the model output
    predicted_score = outputs.logits.item()
    prediction_col.append(predicted_score)

    # Calculate the difference between the predicted and actual score
    difference = abs(predicted_score - score)
    average_prediction_difference += difference
    
    if predicted_score < lowest_predicted_score:
        lowest_predicted_score = predicted_score

    if predicted_score > highest_predicted_score:
        highest_predicted_score = predicted_score

df.loc[:, 'predicted'] = prediction_col

# save to csv
df.to_csv('testing_prediction_dataset.csv', index=False)

# print results
average_prediction_difference /= len(df)

print('The lowest predicted score: ', lowest_predicted_score)
print('The highest predicted score: ', highest_predicted_score)
print('The average difference between the predicted and actual scores: ', average_prediction_difference)

# The lowest predicted score:  0.351510614156723
# The highest predicted score:  1.0551989078521729
# The average difference between the predicted and actual scores:  0.13590944178041864