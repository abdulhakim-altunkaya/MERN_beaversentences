import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { setColor } from '../state/colorSlice';

import TestInput2B from "./TestInput2B";

function TestInput2() {
    
    const dispatch = useDispatch(); 

    let [inputValue, setInputValue] = useState("");

    const handleColorChange = (e) => {
        const color = e.target.value;
        setInputValue(e.target.value);
        dispatch(setColor(color));
    };

    return (
        <div>
            <div>
                <label htmlFor="colorInput">Choose a color: </label>
                <input
                    type="text"
                    id="colorInput"
                    value={inputValue}
                    onChange={handleColorChange}
                />
            </div>
            <p>{inputValue}</p>
            <TestInput2B />
        </div>

    )
}

export default TestInput2