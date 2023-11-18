import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Mark from "mark.js";
import { useSelector } from 'react-redux';


function ResultsEngtur() {
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
    const getSentences = async () => {
      //there are security checks in Input component, just in case I am putting one more here
      if (param.length < 4) {
        alert("Website: Your word is too short");
        return;
      }
      const url = `http://localhost:5000/api/engtur/search?word=${param}&pair=${pairId}`;
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
  }, [param]);


  return (
    <div>
      <div>
        <p>{serverResponse}</p>
        <div className='resultContainer1'>
          {serverArray.length < 1 ?
            <span>Unfortunately no results for <strong>{param}</strong></span>
          :
            <div className='resultContainer2'>
              <div>Search results for <strong>{param}</strong></div>
              <div ref={markRef}>
                {serverArray.map((item, index) => (
                  <div key={item._id} className='resultContainer3'>
                    <span>{item.SentenceEng}</span>
                    <span>{item.SentenceTur}</span>
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

export default ResultsEngtur;