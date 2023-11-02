import React, {useState} from 'react'
import '../style/dropdown.css';

function Dropdown() {

    let [selected, setSelected] = useState("");

    const handleSelect = (e) => {
      setSelected(e.target.value);
    }

  return (
      <div class= "selectMainDiv">

        <div class="selectChildDiv">
          <select className='selectArea' value={selected} onChange={handleSelect}>
            <option value='' disabled>Select Language</option>
            <option value='English-Turkish'>English-Turkish</option>
            <option value='Turkish-English'>Turkish-English</option>
            <option value='English-Portuguese'>English-Portuguese</option>
            <option value='Portuguese-English'>Portuguese-English</option>
          </select>
        </div>

        <div>
          <p>{selected}</p>
        </div>
        
      </div> 
  )

}

export default Dropdown;
