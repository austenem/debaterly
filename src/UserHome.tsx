/**
 * Home for users to evaluate the quality of their writing.
 * @author Austen Money
 */

// Import React
import React, { useReducer } from 'react';

// Import helper components
import { Circles } from 'react-loader-spinner';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea'

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
        userText: action.userText,
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
    userText: 'Cats having the capacity to vote would vastly improve the political landscape. They are intelligent creatures that can make informed decisions.',
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
      // Determine the class name for the sentence
      let className = 'UserHome-Normal';
      if (scores[i] >= 80) {
        className = 'UserHome-Excellent';
      } else if (scores[i] <= 30) {
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
    // Show the loading spinner
    dispatch({
      type: ActionType.showLoading,
    });

    // Split the user text into sentences
    let arg = userText.replace(/(\.+|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, "$1$2|").split("|");
    console.log("user text: ", arg)

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

    // Make the fetch request
    fetch('/evaluate', options)
      .then(response => {
        // Check if the response is successful (status code 200)
        if (response.ok) {
          // Parse the JSON response
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
          evaluate the quality of your argumentative writing!
        </i>
      </div>
      <div className="UserHome-inner-container">
        <div className="UserHome-left-side">
          <div className="UserHome-text-area">
            <HighlightWithinTextarea
              value={userText}
              // className="UserHome-text-area"
              // placeholder="Cats having the capacity to vote would vastly improve the political landscape. They are intelligent creatures that can make informed decisions."
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
              placeholder="Cats should be able to vote."
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
