import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import '../style/input.css';
//We will prevent users to make search if language pair is not selected.
//Pair number wil be fetched from redux storage
import { useSelector } from "react-redux";

function Input() {
  //fetching pair number from redux storage
  const pairId = useSelector( (state) => state.pair)

  const navigate = useNavigate();
  let [searchSymbol, setSearchSymbol] = useState(false);
  let [inputValue, setInputValue] = useState("")
  
  //function to trigger handleSearch if "enter" key is pressed. Only for convenience.
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  const handleSearch = () => {
    if(pairId < 1 || pairId > 4) {
      alert("You need to select a language pair");
      return;
    }
    if(inputValue == "") {
      alert("Please enter a word");
      return;
    } else if(inputValue.length < 4) {
      alert("Your word is too short, please enter a longer word");
      return;
    }  else if(inputValue.length > 30) {
      alert("Your word is too long");
      return;
    }
    setSearchSymbol(true); 
    navigate(`/results/${inputValue}`);
    setTimeout(() => {
      
    }, 0);
    setSearchSymbol(false);
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
          {searchSymbol ? 
            "⏳"
          : 
            "🔍"
          }
        </button>
    </div>
  )
}

export default Input