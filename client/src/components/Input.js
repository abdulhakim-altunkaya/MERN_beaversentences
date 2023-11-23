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
    //input checks
    if(pairId < 1 || pairId > 10) {
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

    //routing to relevant language pair component based on the selected pair
    setSearchSymbol(true); 
    if(pairId == 1) {
      navigate(`/results/engtur/${inputValue}`);
    } else if(pairId == 2) {
      navigate(`/results/tureng/${inputValue}`);
    } else if(pairId == 3) {
      navigate(`/results/engpor/${inputValue}`);
    } else if(pairId == 4) {
      navigate(`/results/poreng/${inputValue}`);
    } else if(pairId == 5) {
      navigate(`/results/engger/${inputValue}`);
    } else if(pairId == 6) {
      navigate(`/results/gereng/${inputValue}`);
    } else if(pairId == 7) {
      navigate(`/results/gertur/${inputValue}`);
    } else if(pairId == 8) {
      navigate(`/results/turger/${inputValue}`);
    } else if(pairId == 9) {
      navigate(`/results/engesp/${inputValue}`);
    } else if(pairId == 10) {
      navigate(`/results/espeng/${inputValue}`);
    }
    setSearchSymbol(false);

    
    //setSearchSymbol(true); 
    //navigate(`/results/${inputValue}`);
    //setSearchSymbol(false);
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