import React from 'react'

function ResultsTureng() {
  //we are getting pairId to tell backend which language pair to conduct search.
  //PairId is coming from redux storage. Redux storage gets it from dropdown menu through input component search function.
  const pairId = useSelector( (state) => state.pair)
  //param name is coming from App.js. We will use it 1) as query data 2) as a security check on length of target word
  //This component will be displayed with useParams. However we will make our search by using req.query
  const {param} = useParams();
  return (
    <div>ResultsTureng</div>
  )
}

export default ResultsTureng