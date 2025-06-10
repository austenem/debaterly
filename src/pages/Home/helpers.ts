import { HighlightedSentence, QualityCategory } from "./types";

/**
 * Find the quality category based on the quality score
 * @author Austen Money
 * @param score the quality score
 * @returns the quality category
 */
export const getQualityCategory = (score: number): QualityCategory => {
  if (score >= 80) {
    return 'Excellent';
  }
  if (score >= 60) {
    return 'Good';
  }
  if (score >= 40) {
    return 'Fair';
  }
  if (score >= 1) {
    return 'Poor';
  }
  return '-';
};

/**
 * Figure out which sentences to highlight based on the quality scores of
 * each sentence
 * @author Austen Money
 */
export const analyzeSentences = (
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