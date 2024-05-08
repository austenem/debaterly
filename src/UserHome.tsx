import React, { useEffect, useState } from 'react';

function UserHome() {

  const [data, setData] = useState({test: ''})

  useEffect(() => {
    fetch('/load').then(
      response => response.json()
    ).then(data => setData(data))
  }, [])

  return (
    <div className="UserHome">
      Hello world!
      <ul>
        {data.test}
      </ul>
    </div>
  );
}

export default UserHome;