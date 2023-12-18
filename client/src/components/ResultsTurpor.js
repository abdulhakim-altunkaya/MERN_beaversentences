import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Mark from "mark.js";
import { useSelector } from 'react-redux';
import end2 from "./flags/end2.png";


function ResultsTurpor() {
  //we are getting pairId to tell backend which language pair to conduct search.
  //PairId is coming from redux storage. Redux storage gets it from dropdown menu through input component search function.
  const pairId = useSelector( (state) => state.pair);
  //param name is coming from App.js. We will use it 1) as query data 2) as a security check on length of target word
  //This component will be displayed with useParams. However we will make our search by using req.query
  const {param} = useParams();

  let [serverResponse, setServerResponse] = useState("");
  let [serverArray, setServerArray] = useState([]);

  const markRef = useRef(null);//we are using mark.js and useRef to highlight the searched word in results

  useEffect(() => {

    const getSentences = async () => {
      try {
        //there are security checks in Input component, just in case I am putting one more here
        if (param.length < 4) {
          alert("Website: Your word is too short");
          return;
        }
        //actually I dont need this pairId anymore because I am not using backend to assign language pairs.
        //I am doing it in Input.js component
        const url = `/api/turpor/search?word=${param}&pair=${pairId}`;
        const response = await axios.post(url);
        const serverData = response.data;
        setServerArray(serverData.serverResults);
        setServerResponse(serverData.serverMessage);
        setTimeout(() => {
          highlightWord();
        }, 0);
      } catch (error) {
        console.log("Error specific message:", error.message);
        console.log("Error general message:", error);
        setServerResponse(error.response.data.errorMessage);
      }
    }

    const highlightWord = async () => {
      if(markRef.current) {
        const markInstance = new Mark(markRef.current);
        markInstance.unmark();
        markInstance.mark(param);
      }
    }
    getSentences().catch((error) => {
      // Handle errors that occur during the asynchronous operation
      console.log("Async function error catch:", error.response.data.errorMessage);
      console.log("Async generel error:", error)
    })

  }, [param]);


  return ( 
    <div>
      <div>
        <div className='resultContainer1'>
          {serverArray.length < 1 ?
            <div className='resultMessageContainer'>
              <span>Unfortunately no results for:  <strong> {param}</strong> </span> <br/> <br/>
              <span>{serverResponse} </span>
            </div>
          :
            <div className='resultContainer2'>
              <div className='resultMessageContainer' >Search results for <strong>{param}</strong></div>
              <div ref={markRef}>
                {serverArray.map((item, index) => (
                  <div key={item._id} className='resultContainer3'>
                    <span>{item.SentenceTur}</span>
                    <span>{item.SentencePor}</span>
                  </div>
                ))
                }
              </div>
              <div className='endingIconDiv'>
              <img src={end2} className='ending-icon' alt="ending of the search results icon" /> 
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ResultsTurpor;