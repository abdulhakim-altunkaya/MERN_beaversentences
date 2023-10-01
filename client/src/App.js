import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SaveDataComponent from "./components/SaveDataComponent";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={ <SaveDataComponent /> } />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
