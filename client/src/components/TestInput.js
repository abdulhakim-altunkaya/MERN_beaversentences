import React, {useState} from 'react';
import  {useNavigate} from "react-router-dom";

function TestInput() {
    const navigate = useNavigate();

    let [inputValue, setInputValue] = useState("");

    const sendParams = (e) => {
        e.preventDefault();
        navigate(`/search/${inputValue}`)
    }

  return (
    <div>
        <input type='string' 
        placeholder='enter value'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}/>
        <button onClick={sendParams}>SEND INPUT VALUE TO PARAMS</button>
    </div>
  )
}
export default TestInput