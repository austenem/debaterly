import React, { useEffect, useState } from 'react';

function UserHome() {

  const [arg, setArg] = useState('')
  const [topic, setTopic] = useState('')
  const [data, setData] = useState('')

  const onSubmit = () => {
    // Data to send in the request body
    const data = {
        arg,
        topic,
    };

    // Options for the fetch request
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
            console.log('Quality Score:', data.quality_score);
            setData(data.quality_score)
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
        });


    fetch('/evaluate').then(
      response => response.json()
    ).then(data => setData(data))
  }

  return (
    <div className="UserHome">
      <h1>Enter topic:</h1>
      <input type="text" value={topic} onChange={e => setTopic(e.target.value)} />
      <h1>Enter argument:</h1>
      <input type="text" value={arg} onChange={e => setArg(e.target.value)} />
      <button onClick={onSubmit}>Submit</button>
      <h1>Score:</h1>
      <ul>
        {data}
      </ul>
    </div>
  );
}

export default UserHome;