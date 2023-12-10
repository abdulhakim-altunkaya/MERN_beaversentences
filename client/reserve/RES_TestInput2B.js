import React, {useState} from 'react';
import { useSelector } from 'react-redux';

function TestInput2B() {
    const color2 = useSelector((state) => state.color);
    let [reduxValue, setReduxValue] = useState("");

    console.log("data from redux:", color2)
    const getValue = () => {
      setReduxValue(color2);
    }
    return (
        <div>
            <span>Greetings from Redux: {reduxValue}</span>
            <button onClick={getValue}> GET VALUE FROM REDUX </button>
        </div>
    )
    
}

export default TestInput2B;