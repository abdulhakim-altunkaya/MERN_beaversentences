import React, {useState} from 'react'
import { useSelector } from "react-redux";

function TestInput6B() {
  const pairId = useSelector( (state) => state.pair)
  let [reduxValue, setReduxValue] = useState("");

  const getReduxValue = () => {
    setReduxValue(pairId)
  }

  return (
    <div>
      <button onClick={getReduxValue}> GET VALUE FROM REDUX </button>
      <span> Here is redux value good boi: {reduxValue} </span>
    </div>
  )
}

export default TestInput6B;