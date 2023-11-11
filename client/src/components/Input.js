import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";


import '../style/input.css';


function Input() {
  const navigate = useNavigate();
  let [searchStatus, setSearchStatus] = useState(false);
  let [inputValue, setInputValue] = useState("")
  
  //function to trigger handleSearch if "enter" key is pressed. Only for convenience.
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  const handleSearch = () => {
    if (inputValue.length < 4) {
      alert("Your word is too short, please enter a longer word");
      return;
    }
    setSearchStatus(true);
    navigate(`/results/${inputValue}`)
    setSearchStatus(false);
  }

  return (
    <div className="inputMainDiv">
        <input type="text" 
        className="inputField" 
        placeholder="Enter text here"
        minLength="3" 
        value={inputValue}
        onChange={e => setInputValue(e.target.value)} 
        onKeyUp={handleKeyPress} />
        <button className="searchButton" onClick={handleSearch}>
          {searchStatus ? 
            "⏳"
          : 
            "🔍"
          }
        </button>
    </div>
  )
}

export default Input