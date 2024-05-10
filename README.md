# Get Started with Debaterly

<img width="1353" alt="Screen Shot 2024-05-09 at 11 39 28 PM" src="https://github.com/austenem/debaterly/assets/84676120/9b3b18f1-0df2-44d6-b04b-3d4bab4fc738">

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set up:

First, clone into the repo. 

From the root directory, run 

### `npm install`

Then from the server directory, run

### `source venv/bin/activate`

and

### `pip install -r requirements.txt`

in order to install all dependencies.

## Running the app:

Run:

### `npm run server`

Then in a new terminal, run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## About Debaterly

Debaterly is designed to help users evaluate how well their persuasive writing
supports their intended argument. It accepts a piece of writing and a short 
central argument/topic, then assigns an argumentative strength score from 0 - 100.

The LLM that assigns the score (see [huggingface repo](https://huggingface.co/austenem/arg-quality-regression))
is a fine-tuned version of google-bert/bert-base-uncased. It was trained for this
regression task on the ["IBM Debater® - IBM-ArgQ-Rank-30kArgs"](https://research.ibm.com/haifa/dept/vst/debating_data.shtml#Argument_Quality) dataset using transformers.

All files used for this process can be found in the `server/llm` folder, including
those for processing the IBM dataset (`format-data.py`), training the model in 
a Google Colab workspace (`regression-training.ipynb`), and testing the model 
post-training (`test-model.py`). 

(AN: This model went through several iterations, all of which were less successful 
due to a misclassification of the task at hand. The first attempted to solve
this as a text-generation problem, which led to wildly inaccurate scores followed
by excessive amounts of text. The next used a text-classification approach,
turning rounded scores into categories from 0-100. This was slightly more effective
but still fairly inaccurate. Treating this as a regression problem led to the most 
successful model of the batch by far.)

The Debaterly app uses a Flask/Python backend and a React/TypeScript frontend. 

In order to retrieve scores, the backend server formats and tokenizes the given
user argument and topic before running it through the model. If the argument is 
longer than 200 characters, it is split into a new request, and the average 
of these batched requests is used to generate the score. 

These scores from the model are in the range of 0.35 - 1.04. They are then
normalized to be within a 0-100 range, which is returned to the frontend.

The frontend of the app has inputs for user text and displays the model
score in an intuitive and aesthetically pleasing way. It uses state management
to update the score and inputs, and CSS to style the UI.

## Next Steps

Next steps for Debaterly will prioritize refining the training and testing 
process for the model. More research and experimentation needs to be done to 
bolster its accuracy with the given task. 

Currently, the average difference between the model's score and a human-assigned
score from the IBM test set is ~.135. This is a wide margin considering the 
dataset's scores are highly clustered within a ~.3 range. Additionally, the model
weights certain qualities of the user input - vocabulary variation, length, etc - 
higher than the input's relevance to the given topic. A well-written answer is 
usually given a high score regardless of how it relates to the argument at hand.

Second to this is the user interface. We would like to improve the screening process
for user queries - empty inputs should ideally produce an alert, and long inputs
should be batched in a more cohesive way (i.e. by sentences rather than characters.)

Once these are addressed, we would like to introduce new features to the app,
including a highlighting feature that would draw attention to areas of the user
text that need work or are especially convincing. 
