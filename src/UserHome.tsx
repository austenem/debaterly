/**
 * Home for users to evaluate the quality of their writing.
 * @author Austen Money
 */

// Import React
import React, { useReducer } from 'react';

// Import helper components
import { Circles } from 'react-loader-spinner';

// Import style
import './UserHome.css';

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
  // Update the quality score and category
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
    userText: '',
    userTopic: '',
    qualityScore: 0,
    qualityCategory: 'Poor',
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
    isLoading,
  } = state;

  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * On click of the score button, send the user text to model for evaluation
   * @author Austen Money
   */
  const scoreText = () => {
    // Show the loading spinner
    dispatch({
      type: ActionType.showLoading,
    });

    // Data to send in the request body
    const data = {
      arg: userText,
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
        // Handle the response data
        dispatch({
          type: ActionType.UpdateQuality,
          qualityScore: data.quality_score,
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
          <textarea
            value={userText}
            className="UserHome-text-area"
            placeholder="Cats having the capacity to vote would vastly improve the political landscape. They are intelligent creatures that can make informed decisions."
            onChange={e => {
              dispatch({
                type: ActionType.UpdateUserText,
                userText: e.target.value,
              });
            }}
          />
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
                <div className={`UserHome-score UserHome-${qualityCategory}`}>
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
