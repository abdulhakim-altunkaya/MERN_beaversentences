import React, { useState } from 'react';
import axios from 'axios';

function TestInput3() {
  const [inputValue, setInputValue] = useState('');
  const [serverResponse, setServerResponse] = useState('');

  const sendQuery = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/test3/search?searchTerm=${inputValue}`, null, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const data = await response.data;
        console.log(data);
        setServerResponse(data.myMessage);
      } else {
        console.log('Error in try section of React TestInput2. Unable to render the server response on the frontend.');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={sendQuery}>QUERY CHECK</button>
      <p>{serverResponse}</p>
    </div>
  );
}

export default TestInput3;
