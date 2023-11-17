import React, { useState, useRef, useEffect } from 'react';
import '../style/dropdown.css';
import flagUSA from './flags/usa.png';
import flagTUR from './flags/turkey.png';
import flagPOR from './flags/portugal.png';

import { useDispatch } from 'react-redux';
import { setPair } from "../state/slicePair"; 

function Dropdown() {

  //language pair id value for backend and database operation.
  const dispatch = useDispatch();

  //language pair main selection area related code
  const [pairChosen, setPairChosen] = useState(false);

  //language pairs drowdown effect related code
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  let [languagePair, setLanguagePair] = useState("");
  let [flag1, setFlag1] = useState("");
  let [flag2, setFlag2] = useState("");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSelect = (valueFlag1, valueFlag2, valuePair, valuePairNumber) => {
    if (valuePairNumber < 1 && valuePairNumber > 4) {
      alert("Select language pair or refresh the page.");
      return;
    }
    
    setPairChosen(true);
    setIsOpen(false);

    setLanguagePair(valuePair);
    setFlag1(valueFlag1)
    setFlag2(valueFlag2)

    console.log(valuePairNumber);
    
    //language pair is saved to redux storage for backend and database operations. Later
    //input component will use this id value for search operation on database.
    dispatch(setPair(valuePairNumber));
  };

  return (
    <div className="select-container" ref={dropdownRef}>
      <div className="select-display" onClick={() => setIsOpen(!isOpen)}>
        <div>
          {
            pairChosen ? 
            <div className='innerMainSelectField'>
              <img src={flag1} alt="current origin language flag" className="option-icon" /> 
              <img src={flag2} alt="current target language flag" className="option-icon" /> 
              <span>{languagePair}</span>
            </div>
            :
            <>
              Select Language
            </>
          }
        </div>

        <div>
          <span className="select-arrow">&#9660;</span> {/* Unicode down arrow */}
        </div>
        


      </div>
      {isOpen && (
        <div className="options-container">
          <div className="option-each" onClick={() => handleSelect(flagUSA, flagTUR, "English-Turkish", 1)}>
            <img src={flagUSA} alt="USA Flag" className="option-icon" /> 
            <img src={flagTUR} alt="USA Flag" className="option-icon" /> 
            English-Turkish
          </div>
          <div className="option-each" onClick={() => handleSelect(flagTUR, flagUSA, 'Turkish-English', 2)}>
            <img src={flagTUR} alt="USA Flag" className="option-icon" /> 
            <img src={flagUSA} alt="USA Flag" className="option-icon" /> 
            Turkish-English
          </div>
          <div className="option-each" onClick={() => handleSelect(flagUSA, flagPOR, 'English-Portuguese', 3)}>
            <img src={flagUSA} alt="USA Flag" className="option-icon" /> 
            <img src={flagPOR} alt="USA Flag" className="option-icon" /> 
            English-Portuguese
          </div>
          <div className="option-each" onClick={() => handleSelect(flagPOR, flagUSA, 'Portuguese-Turkish', 4)}>
            <img src={flagPOR} alt="USA Flag" className="option-icon" /> 
            <img src={flagUSA} alt="USA Flag" className="option-icon" /> 
            Portuguese-English
          </div>
          {/* More options... */}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
