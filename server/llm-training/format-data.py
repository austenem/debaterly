import pandas as pd

# read and clean data
df = pd.read_csv('arg_quality_rank_30k.csv')
df = df.fillna('')

# add text column with prompt format
text_col = []
label_col = []
for _, row in df.iterrows():
    argument = str(row['argument'])
    topic = str(row['topic'])
    score = row['WA']
    
    text = f"### Argument: {argument} ### Topic: {topic}"

    # score = str(int(round(score, 2) * 100))

    label_col.append(score)
    text_col.append(text)

# add columns to dataframe
df.loc[:, 'text'] = text_col
df.loc[:, 'labels'] = label_col

# drop unnecessary columns
df = df.drop(columns=['argument', 'topic', 'WA', 'MACE-P', 'stance_WA', 'stance_WA_conf'])

# split training and testing data (training includes dev set)
dfTest = df[df['set'] == 'test']
dfTrain = df[df['set'] != 'test']

# drop set column
dfTest = dfTest.drop(columns=['set'])
dfTrain = dfTrain.drop(columns=['set'])

# save to csv
dfTrain.to_csv('training_raw_dataset.csv', index=False)
dfTest.to_csv('testing_raw_dataset.csv', index=False)
