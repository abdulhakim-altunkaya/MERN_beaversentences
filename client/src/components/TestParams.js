import React from 'react';
import { useParams } from 'react-router-dom';

function TestParams() {
  const { param } = useParams(); //param name is coming from server.js
  console.log(param);
  return (
    <div>
      <span>{param}</span>
    </div>
  );
}

export default TestParams;