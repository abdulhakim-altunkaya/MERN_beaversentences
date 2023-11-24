import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Mark from "mark.js";
import { useSelector } from 'react-redux';


function ResultsEngesp() {
  //we are getting pairId to tell backend which language pair to conduct search.
  //PairId is coming from redux storage. Redux storage gets it from dropdown menu through input component search function.
  const pairId = useSelector( (state) => state.pair)
  //param name is coming from App.js. We will use it 1) as query data 2) as a security check on length of target word
  //This component will be displayed with useParams. However we will make our search by using req.query
  const {param} = useParams();

  let [serverResponse, setServerResponse] = useState("");
  let [serverArray, setServerArray] = useState([]);

  const markRef = useRef(null);//we are using mark.js and useRef to highlight the searched word in results

  useEffect(() => {
    try {
      const getSentences = async () => {
        //there are security checks in Input component, just in case I am putting one more here
        if (param.length < 4) {
          alert("Website: Your word is too short");
          return;
        }
        //actually I dont need this pairId anymore because I am not using backend to assign language pairs.
        //I am doing it in Input.js component
        const url = `/api/engesp/search?word=${param}&pair=${pairId}`;
        const response = await axios.post(url);
        const serverData = response.data;
        setServerArray(serverData.serverResults);
        setServerResponse(serverData.serverMessage);
        setTimeout(() => {
          highlightWord();
        }, 0);
      }
  
      const highlightWord = async () => {
        if(markRef.current) {
          const markInstance = new Mark(markRef.current);
          markInstance.unmark();
          markInstance.mark(param);
        }
      }
      getSentences();
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setServerResponse(`Error: ${error.response.data.errorMessage} and Status: ${error.response.status}`)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        setServerResponse('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }, [param]);

  
  return (
    <div>
      <div>
        <div className='resultContainer1'>
          {serverArray.length < 1 ?
            <span className='negativeResultSpan'>Unfortunately no results for <strong>{param}</strong> <br/>
            {serverResponse}
            </span>
          :
            <div className='resultContainer2'>
              <div className='resultMessageContainer' >Search results for <strong>{param}</strong></div>
              <div ref={markRef}>
                {serverArray.map((item, index) => (
                  <div key={item._id} className='resultContainer3'>
                    <span>{item.SentenceEng}</span>
                    <span>{item.SentenceEsp}</span>
                  </div>
                ))
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ResultsEngesp;