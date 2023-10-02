import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SaveDataComponent from "./components/SaveDataComponent";
import Read from "./components/Read";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={ <SaveDataComponent /> } />
                    <Route path="/read" element={ <Read /> } />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
