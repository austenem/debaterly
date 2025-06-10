import React, { useCallback, useEffect } from 'react';
import { HighlightedSentence } from './types';
import { analyzeSentences, getQualityCategory } from './helpers';

export function useScoreText() {
  const [userText, setUserText] = React.useState('\n\n\n');
  const [userTopic, setUserTopic] = React.useState('');
  const [qualityScore, setQualityScore] = React.useState(0);
  const [highlightedSentences, setHighlightedSentences] = React.useState<HighlightedSentence[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // Reset score and highlights on text or topic change
  useEffect(() => {
    setQualityScore(0);
    setHighlightedSentences([]);
  }, [userText, userTopic]);

  /**
   * On click of the score button, send the user text to model for evaluation
   * @author Austen Money
   */
  const scoreText = useCallback(() => {
    // Check that all fields have been given
    if (userTopic === '') {
      alert('Please enter your central argument.');
      return;
    } else if (userText === '') {
      alert('Please provide your writing sample.');
      return;
    }

    // Show the loading spinner
    setIsLoading(true);

    // Split the user text into sentence array
    let argument = userText.replace(/(\.+|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2|").split("|");

    const data = {
      argument,
      topic: userTopic,
    };

    // Options for the fetch request
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const backendUrl = process.env.DATABASE_API_URL || "http://localhost:8080";

    // Make the score fetch request
    fetch(`${backendUrl}/api/submissions`, options)
    .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          // If response is not successful, throw an error
          throw new Error('Failed to evaluate writing');
        }
      })
      .then(data => {
        const { averageScore, scores } = data;

        const highlightedSentences = analyzeSentences(argument, scores); 

        // Update the state with the results
        setQualityScore(averageScore);
        setHighlightedSentences(highlightedSentences);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [userText, userTopic, setIsLoading, setQualityScore, setHighlightedSentences]);

  const qualityCategory = getQualityCategory(qualityScore);

  return {
    userText,
    setUserText,
    userTopic,
    setUserTopic,
    highlightedSentences,
    qualityScore,
    qualityCategory,
    scoreText,
    isLoading,
  };
}
