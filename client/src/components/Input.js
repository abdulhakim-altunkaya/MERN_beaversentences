import React, {useState} from 'react'
import '../style/input.css';


function Input() {

  let [searchStatus, setSearchStatus] = useState(false);

  const handleSearch = () => {
    setSearchStatus(true);
  }

  return (
    <div className="inputMainDiv">
        <input type="text" className="inputField" placeholder="Enter text here" />
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