import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import WriteEngpor from './components/WriteEngpor';
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import About from "./components/About";
import ResultsEngtur from "./components/ResultsEngtur";
import ResultsTureng from "./components/ResultsTureng";
import ResultsEngpor from "./components/ResultsEngpor";
import ResultsPoreng from "./components/ResultsPoreng";

function App() {
    return (
        <Router>
            <div className='mainDiv'>
                <Navbar />
                <MainContent />
                <Routes>
                    <Route path="/about" element={ <About /> } />
                    <Route path="/write1" element={ <WriteEngpor /> } />
                    <Route path="/results/engtur/:param" element={ <ResultsEngtur /> } /> 
                    <Route path="/results/tureng/:param" element={ <ResultsTureng /> } /> 
                    <Route path="/results/engpor/:param" element={ <ResultsEngpor /> } /> 
                    <Route path="/results/poreng/:param" element={ <ResultsPoreng /> } /> 
                </Routes>
            </div>
        </Router>
    );
}
export default App;
 