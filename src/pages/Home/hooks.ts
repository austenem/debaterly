import React, { useCallback, useMemo } from 'react';
import { HighlightedSentence } from './types';

/**
 * Find the quality category based on the quality score
 * @author Austen Money
 * @param score the quality score
 * @returns the quality category
 */
const getQualityCategory = (score: number): 
('Excellent' | 'Good' | 'Fair' | 'Poor') => {
  if (score >= 80) {
    return 'Excellent';
  }
  if (score >= 60) {
    return 'Good';
  }
  if (score >= 40) {
    return 'Fair';
  }
  return 'Poor';
};

/**
 * Figure out which sentences to highlight based on the quality scores of
 * each sentence
 * @author Austen Money
 */
const analyzeSentences = (
  sentences: string[],
  scores: number[]
): HighlightedSentence[] => {
  // Initialize the highlighted sentences array
  const highlightedSentences: HighlightedSentence[] = [];

  // Determine if each sentence should be highlighted
  for (let i = 0; i < sentences.length; i++) {
    // Skip empty sentences or those without scores
    if (sentences[i].trim() === '' || isNaN(scores[i])) {
      continue;
    }

    // Determine the class name for the sentence
    let className = 'UserHome-Normal';
    if (scores[i] >= 65) {
      className = 'UserHome-Excellent';
    } else if (scores[i] <= 35) {
      className = 'UserHome-Poor';
    }

    // Add the sentence to the highlighted sentences array
    highlightedSentences.push({
      highlight: sentences[i],
      className,
    });
  }

  return highlightedSentences;
};

export function useScoreText() {
  const [userText, setUserText] = React.useState('\n\n\n');
  const [userTopic, setUserTopic] = React.useState('');
  const [qualityScore, setQualityScore] = React.useState(0);
  const [highlightedSentences, setHighlightedSentences] = React.useState<HighlightedSentence[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

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

    // Choose a backend URL based on environment variables or default to localhost 
    // const backendUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
    // Use spring boot backend for evaluation
    const backendUrl = "http://localhost:8080";

    // Make the fetch request
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

        // Handle the response data
        setQualityScore(averageScore);
        setHighlightedSentences(highlightedSentences);
        setIsLoading(false);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
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
