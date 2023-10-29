import React, {useState} from 'react'

function Dropdown() {

    let [selected, setSelected] = useState("");

    const handleSelect = (e) => {
      setSelected(e.target.value);
    }

  return (
    <div>
        <select value={selected} onChange={handleSelect}>
            <option value='' disabled>Select Language</option>
            <option value='English-Turkish'>English-Turkish</option>
            <option value='Turkish-English'>Turkish-English</option>
            <option value='English-Portuguese'>English-Portuguese</option>
            <option value='Portuguese-English'>Portuguese-English</option>
        </select>
        <p>{selected}</p>
    </div>
  )

}

export default Dropdown;
