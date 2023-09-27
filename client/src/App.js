import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./components/Test";

function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/api" element={ <Test />} />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
