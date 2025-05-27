/**
 * Home for users to evaluate the quality of their writing.
 * @author Austen Money
 */

// Import React
import React, { useReducer } from 'react';

// Import helper components
import { Circles } from 'react-loader-spinner';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea'

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCat,
  faBook,
  faBowlRice
} from '@fortawesome/free-solid-svg-icons';

// Import style
import './UserHome.css';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

type highlightedSentence = {
    // The sentence
    highlight: string,
    // The class name for the sentence
    className: string,
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/

// Example writing samples
const SOUP_EXAMPLE_TEXT = "Cereal can be considered a soup because it meets the basic criteria of a liquid-based food with solid ingredients. This combination mirrors the structure of many soups, which consist of a broth or liquid base with various solid additions like vegetables, meats, or grains. The preparation and consumption method of pouring liquid over solids further supports the classification of cereal as a type of cold soup. \n\nOn the other hand, I'm not quite sure. Does cereal really count as a soup? More research needs to be done."
const SOUP_EXAMPLE_TOPIC = "Cereal is a type of soup."

const ESSAY_EXAMPLE_TEXT = "Bram Stoker’s 1897 novel Dracula is celebrated for its unique narrative structure, which unfolds through the private reflections and thoughts of its characters. This collage of narratives adds dimension to each of the characters, and gives the reader the opportunity to observe them from multiple perspectives. \n\nAt the heart of this web of narration is Mina Murray, who is both the heroine and the fictional “author” of the novel itself. Her intelligence and resourcefulness contribute significantly to the progression of the novel’s plot, and her relationship with Jonathan adds crucial emotional depth to the story. These contributions are lost in the 1931 film adaptation of Dracula which, much like its titular villain, sucks the life out of Mina."
const ESSAY_EXAMPLE_TOPIC = "The 1931 film adaptation of Dracula is unsuccessful in its portrayal of Mina Murray."

const CAT_EXAMPLE_TEXT = "Cats having the capacity to vote would vastly improve the political landscape. They are intelligent creatures that can make informed decisions. Also, my cat is very smart."
const CAT_EXAMPLE_TOPIC = "Cats should be able to vote."

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
    // The text to evaluate
    userText: string,
    // The topic of the text
    userTopic: string,
    // The quality score of the text
    qualityScore: number,
    // The quality category of the text
    qualityCategory: 'Excellent' | 'Good' | 'Fair' | 'Poor',
    // Sentences to highlight
    highlightedSentences: highlightedSentence[],
    // Whether the evaluation is loading
    isLoading: boolean,
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  // Update the user text
  UpdateUserText = 'UpdateUserText',
  // Update the user topic
  UpdateUserTopic = 'UpdateUserTopic',
  // Update the quality scores and category
  UpdateQuality = 'UpdateQuality',
  // Show the loading spinner
  showLoading = 'showLoading',
}

// Action definitions
type Action = (
  | {
    // Action type
    type: ActionType.UpdateUserText,
    // The new user text
    userText: string,
  }
  | {
    // Action type
    type: ActionType.UpdateUserTopic,
    // The new user topic
    userTopic: string,
  }
  | {
    // Action type
    type: ActionType.UpdateQuality,
    // The new quality score
    qualityScore: number,
    // The new highlighted sentences
    highlightedSentences: highlightedSentence[],
  }
  | {
    // Action type
    type: ActionType.showLoading,
  }
);

/**
 * Reducer that executes actions
 * @author Austen Money
 * @param state current state
 * @param action action to execute
 * @returns updated state
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.UpdateUserText: {
      return {
        ...state,
        userText: (action.userText === '') ? '\n' : action.userText,
      };
    }
    case ActionType.UpdateUserTopic: {
      return {
        ...state,
        userTopic: action.userTopic,
      };
    }
    case ActionType.UpdateQuality: {
      return {
        ...state,
        qualityScore: action.qualityScore,
        qualityCategory: getQualityCategory(action.qualityScore),
        highlightedSentences: action.highlightedSentences,
        isLoading: false,
      };
    }
    case ActionType.showLoading: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default: {
      return state;
    }
  }
};

/*------------------------------------------------------------------------*/
/* --------------------------- Static Helpers --------------------------- */
/*------------------------------------------------------------------------*/

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

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const UserHome: React.FC<{}> = () => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- State ------------- */

  // Initial state
  const initialState: State = {
    userText: '\n\n\n',
    userTopic: '',
    qualityScore: 0,
    qualityCategory: 'Poor',
    highlightedSentences: [],
    isLoading: false,
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const {
    userText,
    userTopic,
    qualityScore,
    qualityCategory,
    highlightedSentences,
    isLoading,
  } = state;

  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Figure out which sentences to highlight based on the quality scores of
   * each sentence
   * @author Austen Money
   */
  const analyzeSentences = (
    sentences: string[],
    scores: number[]
  ): highlightedSentence[] => {
    // Initialize the highlighted sentences array
    const highlightedSentences: highlightedSentence[] = [];

    console.log("scores: ", scores)

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

  /**
   * On click of the score button, send the user text to model for evaluation
   * @author Austen Money
   */
  const scoreText = () => {
    // Check that all fields have been given
    if (userTopic === '') {
      alert('Please enter your central argument.');
      return;
    } else if (userText === '') {
      alert('Please provide your writing sample.');
      return;
    }

    // Show the loading spinner
    dispatch({
      type: ActionType.showLoading,
    });

    // Split the user text into sentences
    let arg = userText.replace(/(\.+|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2|").split("|");

    // Data to send in the request body
    const data = {
      arg,
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
    const backendUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

    // Make the fetch request
    fetch(`${backendUrl}/evaluate`, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          // If response is not successful, throw an error
          throw new Error('Failed to evaluate writing');
        }
      })
      .then(data => {
        // Determine which sentences to highlight (if any)
        const highlightedSentences = analyzeSentences(arg, data.scores);

        // Handle the response data
        dispatch({
          type: ActionType.UpdateQuality,
          qualityScore: data.average_score,
          highlightedSentences,
        });
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
      });
  };

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  return (
    <div className="UserHome-outer-container">
      <div className="UserHome-title-container">
        <div className="UserHome-title">
          Debaterly
        </div>
        <i className="UserHome-subtitle">
          put your persuasive writing to the test!
        </i>
      <div className="UserHome-examples">
        <i>examples:</i>
        <div 
          className="UserHome-example-icon"
          onClick={() => {
            dispatch({type: ActionType.UpdateUserText, userText: SOUP_EXAMPLE_TEXT});
            dispatch({type: ActionType.UpdateUserTopic, userTopic: SOUP_EXAMPLE_TOPIC});
          }}
        >
          <FontAwesomeIcon icon={faBowlRice} />
        </div>
        <div 
          className="UserHome-example-icon"
          onClick={() => {
            dispatch({type: ActionType.UpdateUserText, userText: ESSAY_EXAMPLE_TEXT});
            dispatch({type: ActionType.UpdateUserTopic, userTopic: ESSAY_EXAMPLE_TOPIC});
          }}
        >
          <FontAwesomeIcon icon={faBook} />
        </div>
        <div 
          className="UserHome-example-icon"
          onClick={() => {
            dispatch({type: ActionType.UpdateUserText, userText: CAT_EXAMPLE_TEXT});
            dispatch({type: ActionType.UpdateUserTopic, userTopic: CAT_EXAMPLE_TOPIC});
          }}
        >
          <FontAwesomeIcon icon={faCat} />
        </div>
      </div>
      </div>
      <div className="UserHome-inner-container">
        <div className="UserHome-left-side">
          <div className="UserHome-text-area">
            <HighlightWithinTextarea
              value={userText}
              highlight={highlightedSentences}
              onChange={e => {
                dispatch({
                  type: ActionType.UpdateUserText,
                  userText: e,
                });
              }}
            />
          </div>
        </div>
        <div className="UserHome-right-side">
          <div className="UserHome-argument">
            What is your central argument?
            <textarea
              value={userTopic}
              className="UserHome-argument-input"
              placeholder="Enter your argument here."
              onChange={e => {
                dispatch({
                  type: ActionType.UpdateUserTopic,
                  userTopic: e.target.value,
                });
              }}
            />
          </div>
            {isLoading ? (
              <div className="UserHome-score-card">
                <div className="UserHome-loader">
                  <Circles
                    color="#000000"
                    height={50}
                    width={50}
                  />
                </div>
              </div>
            ) : (
              <div className="UserHome-score-card">
                <div className="UserHome-score-title">
                  Overall:
                </div>
                <div className={`UserHome-score UserHome-border-${qualityCategory}`}>
                  {qualityScore}
                </div>
                /100
                <div className="UserHome-category">
                  {qualityCategory}
                </div>
              </div>
              )}
              <div className="UserHome-button-container">
                <button
                  onClick={scoreText}
                  className="UserHome-button"
                >
                  Score my writing
                </button>
              </div>
            <div>
          </div>
        </div>
      </div>
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default UserHome;
