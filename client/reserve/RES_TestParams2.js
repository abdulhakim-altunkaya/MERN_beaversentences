import React, {useEffect, useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import Mark from "mark.js";
import { useSelector } from "react-redux";

function TestParams2() {
  //we are getting pairId to tell backend which language pair to conduct search.
  //PairId is coming from redux storage. Redux storage gets it from dropdown menu through input component search function.
  const pairId = useSelector( (state) => state.pair)

  //param name is coming from App.js. We will use it 1) as query data 2) as a security check on length of target word
  //This component will be displayed with useParams. However we will make our search by using req.query
  const { param } = useParams(); 

  let [serverResponse, setServerResponse] = useState("");
  let [serverArray, setServerArray] = useState([]);

  const markRef = useRef(null);//we are using mark.js and useRef to highlight the searched word in results

  useEffect(() => {
    const getSentences = async () => {
      if (param.length < 4) {
        alert("your word is too short, search a longer word");
        return;
      }
      const url = `http://localhost:5000/api/query?search=${param}&pair=${pairId}`;
      const response = await axios.post(url);
      const serverData = await response.data;
      setServerArray(serverData.serverResults);
      setServerResponse(serverData.serverMessage);
      setTimeout(() => {
        highlightWord();
      }, 0);
    }
    const highlightWord = async () => {
      if (markRef.current) {
        const markInstance = new Mark(markRef.current);
        markInstance.unmark();
        markInstance.mark(param);
      }
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

            <div className='resultContainer2' >
              <div>Search results for <strong>{param}</strong> </div>
              <div ref={markRef}>
                {
                  serverArray.map( (item, index) => (
                    <div key={item._id} className='resultContainer3' >
                        <span> {item.SentenceEng}</span>
                        <span> {item.SentencePor}</span>
                    </div>
                  ))
                }
              </div>
              
            </div>

        }
      </div>
    </div>
  );
}

export default TestParams2;