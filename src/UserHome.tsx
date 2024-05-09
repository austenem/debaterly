/**
 * Home for users to evaluate the quality of their writing.
 * @author Austen Money
 */

// Import React
import React, { useReducer } from 'react';

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
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const {
    userText,
    userTopic,
    qualityScore,
    qualityCategory,
  } = state;

  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Add component helper function description
   * @author Austen Money
   * @param addArgName add description of argument
   * @param [addOptionalArgName] add description of optional argument
   * @returns add description of return
   */
  const scoreText = () => {
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
    <div>
      <h1>Debaterly</h1>
      <div>
        <label>
          Topic:
          <input
            type="text"
            value={userTopic}
            onChange={e => {
              dispatch({
                type: ActionType.UpdateUserTopic,
                userTopic: e.target.value,
              });
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Text:
          <textarea
            value={userText}
            onChange={e => {
              dispatch({
                type: ActionType.UpdateUserText,
                userText: e.target.value,
              });
            }}
          />
        </label>
      </div>
      <div>
        <button
          onClick={scoreText}
        >
          Score Text
        </button>
      </div>
      <div>
        <h2>Quality Score: {qualityScore}</h2>
        <h2>Quality Category: {qualityCategory}</h2>
      </div>
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default UserHome;
