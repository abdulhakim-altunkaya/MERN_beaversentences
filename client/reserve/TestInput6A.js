import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { setPair } from "../state/slicePair";
import TestInput6B from "./TestInput6B";

function TestInput6A() {

    const dispatch = useDispatch();

    let [inputValue, setInputValue] = useState("");

    const setPairLanguage = () => {
      dispatch(setPair(inputValue));
    }

    return (
        <div>
            <input type='number'
            placeholder='enter pair number'
            value={inputValue}
            onChange={ e => setInputValue(e.target.value) } />
            <button onClick={setPairLanguage}> set language pair </button>
            <p>{inputValue}</p>
            <TestInput6B />
        </div>
    )
}

export default TestInput6A;
