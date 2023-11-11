import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";


import '../style/input.css';


function Input() {
  const navigate = useNavigate();
  let [searchStatus, setSearchStatus] = useState(false);
  let [inputValue, setInputValue] = useState("")
  
  const handleSearch = () => {
    setSearchStatus(true);
    navigate(`/results/${inputValue}`)
    setSearchStatus(false);
  }

  return (
    <div className="inputMainDiv">
        <input type="text" 
        className="inputField" 
        placeholder="Enter text here" 
        value={inputValue}
        onChange={e => setInputValue(e.target.value)} />
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