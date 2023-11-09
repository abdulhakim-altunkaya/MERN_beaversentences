import React, { useState } from "react";
import axios from "axios";

function TestInput5() {
  let [inputValue, setInputValue] = useState("");
  let [serverResponse, setServerResponse] = useState("");
  let [serverArray, setServerArray] = useState([]);

  const sendqueryData = async () => {
    try {
      // Log the URL for debugging
      const url = `http://localhost:5000/api/goodquery?myinputfrontend=${inputValue}`;
      console.log("Request URL:", url);

      const response = await axios.post(url);

      const data = await response.data;

      console.log(response.data.myReplyfromServer);
      console.log(response.data.myArrayfromServer);
      setServerArray(data.myArrayfromServer)
      setServerResponse(data.myReplyfromServer);

    } catch (error) {
      console.log(error.message);
    }
  };
 
  return (
    <div>
      <input
        type="text"
        placeholder="enter text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={sendqueryData}> SEND QUERY </button>
      <p>{serverResponse}</p>
      <div>
        {
          serverArray.map( (item, index) => (
            <div key={item._id}>
                <span> {item.SentenceEng}</span>"           "
                <span> {item.SentencePor}</span>
            </div>

          ))
        }
      </div>
    </div>
  );
}
export default TestInput5;
