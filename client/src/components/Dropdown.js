import React, { useState, useRef, useEffect } from 'react';
import '../style/dropdown.css';
import flagUSA from './flags/usa.png';
import flagTUR from './flags/turkey.png';
import flagPOR from './flags/portugal.png';

function Dropdown() {

  const [pairChosen, setPairChosen] = useState(false);
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

  const handleSelect = (valueFlag1, valueFlag2, valuePair) => {
    setPairChosen(true);
    setIsOpen(false);

    setLanguagePair(valuePair);
    setFlag1(valueFlag1)
    setFlag2(valueFlag2)
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
          <div className="option-each" onClick={() => handleSelect(flagUSA, flagTUR, "English-Turkish")}>
            <img src={flagUSA} alt="USA Flag" className="option-icon" /> 
            <img src={flagTUR} alt="USA Flag" className="option-icon" /> 
            English-Turkish
          </div>
          <div className="option-each" onClick={() => handleSelect(flagTUR, flagUSA, 'Turkish-English')}>
            <img src={flagTUR} alt="USA Flag" className="option-icon" /> 
            <img src={flagUSA} alt="USA Flag" className="option-icon" /> 
            Turkish-English
          </div>
          <div className="option-each" onClick={() => handleSelect(flagUSA, flagPOR, 'English-Portuguese')}>
            <img src={flagUSA} alt="USA Flag" className="option-icon" /> 
            <img src={flagPOR} alt="USA Flag" className="option-icon" /> 
            English-Portuguese
          </div>
          <div className="option-each" onClick={() => handleSelect(flagPOR, flagUSA, 'Portuguese-Turkish')}>
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
