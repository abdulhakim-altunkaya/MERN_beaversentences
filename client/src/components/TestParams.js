import React from 'react';
import { useParams } from 'react-router-dom';

function TestParams() {
  const { inputValue } = useParams();
  console.log(inputValue);
  return (
    <div>
      {inputValue}
    </div>
  );
}

export default TestParams;
