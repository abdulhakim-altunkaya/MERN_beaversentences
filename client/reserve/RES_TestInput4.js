import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';

function TestInput4() {
  const [inputValue, setInputValue] = useState('');
  const [serverResponseParam, setServerResponseParam] = useState('');
  const [serverResponseQuery, setServerResponseQuery] = useState('');
  const [serverResponseBody, setServerResponseBody] = useState('');

  // Use useParams to access route parameters
  const { id } = useParams();

  const sendParam = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/param-route/${id}`);
      if (response.status === 200) {
        const data = response.data;
        setServerResponseParam(data.myMessage);
      } else {
        console.error('Error in GET request with route parameter');
      }
    } catch (error) { 
      console.error('Error:', error);
    }
  };

  const sendQuery = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/query-route?param=${inputValue}`);
      if (response.status === 200) {
        const data = response.data;
        setServerResponseQuery(data.myMessage);
      } else {
        console.error('Error in GET request with query parameter');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendRequestBody = async () => {
    const requestData = { inputField: inputValue };

    try {
      const response = await axios.post(`http://localhost:5000/api/body-route/${id}`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const data = response.data;
        setServerResponseBody(data.myMessage);
      } else {
        console.error('Error in POST request with request body');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {/* Display the route parameter */}
      <p>Route Parameter: {id}</p>

      {/* Input field for query parameter and request body */}
      <input
        type="text"
        placeholder="Enter text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {/* Buttons to trigger different requests */}
      <button onClick={sendParam}>Send Param</button>
      <p>Server Response (Param): {serverResponseParam}</p>

      <button onClick={sendQuery}>Send Query</button>
      <p>Server Response (Query): {serverResponseQuery}</p>

      <button onClick={sendRequestBody}>Send Request Body</button>
      <p>Server Response (Request Body): {serverResponseBody}</p>
    </div>
  );
}

export default TestInput4;
