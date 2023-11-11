import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

function TestParams2() {

  const { param } = useParams(); //param name is coming from server.js
  let [serverResponse, setServerResponse] = useState("");
  let [serverArray, setServerArray] = useState([]);

  useEffect(() => {
    const getSentences = async () => {
      const url = `http://localhost:5000/api/query?search=${param}`;
      const response = await axios.post(url);

      const serverData = await response.data;
      setServerArray(serverData.serverResults)
      setServerResponse(serverData.serverMessage);
    }
    getSentences();
  }, [param]);


  return (
    <div>
      <p>{serverResponse}</p>
      <div className='resultContainer1'>
        {

          serverArray.length < 1 ?

            <div>Unfortunately no results for <strong>{param}</strong> </div>
          
          :

            <div className='resultContainer2'>
              <div>Search results for <strong>{param}</strong> </div>
              {
                serverArray.map( (item, index) => (
                  <div key={item._id} className='resultContainer3'>
                      <span> {item.SentenceEng}</span>
                      <span> {item.SentencePor}</span>
                  </div>
                ))
              }
            </div>

        }
      </div>
    </div>
  );
}

export default TestParams2;