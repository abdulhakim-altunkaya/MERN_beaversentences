import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import WriteEngpor from './components/WriteEngpor';
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import About from "./components/About";
import ResultsEngtur from "./components/ResultsEngtur";
import ResultsTureng from "./components/ResultsTureng";
import ResultsEngpor from "./components/ResultsEngpor";
import ResultsPoreng from "./components/ResultsPoreng";
import ResultsEngger from "./components/ResultsEngger";
import ResultsTurger from "./components/ResultsTurger"; 
import ResultsGertur from "./components/ResultsGertur";
import ResultsGereng from "./components/ResultsGereng";
import ResultsEngesp from "./components/ResultsEngesp";
import ResultsEspeng from "./components/ResultsEspeng";
import ResultsPortur from "./components/ResultsPortur";
import ResultsTurpor from "./components/ResultsTurpor";
import ResultsTechET from "./components/ResultsTechET";
import ResultsTechTE from "./components/ResultsTechTE";
//index empty component is to overcome error: No routes matched location "/"
import IndexEmptyComp from "./components/IndexEmptyComp";

function App() {
    return (
        <Router>
            <div className='mainDiv'>
                <Navbar />
                <MainContent />
                <Routes>
                    <Route path="/about" element={ <About /> } />
                    <Route path="/write" element={ <WriteEngpor /> } />
                    <Route path="/results/engtur/:param" element={ <ResultsEngtur /> } /> 
                    <Route path="/results/tureng/:param" element={ <ResultsTureng /> } /> 
                    <Route path="/results/engpor/:param" element={ <ResultsEngpor /> } /> 
                    <Route path="/results/poreng/:param" element={ <ResultsPoreng /> } /> 

                    <Route path="/results/engger/:param" element={ <ResultsEngger /> } /> 
                    <Route path="/results/turger/:param" element={ <ResultsTurger /> } /> 
                    <Route path="/results/gereng/:param" element={ <ResultsGereng /> } /> 
                    <Route path="/results/gertur/:param" element={ <ResultsGertur /> } /> 

                    <Route path="/results/espeng/:param" element={ <ResultsEspeng /> } /> 
                    <Route path="/results/engesp/:param" element={ <ResultsEngesp /> } /> 
                    <Route path="/results/portur/:param" element={ <ResultsPortur /> } /> 
                    <Route path="/results/turpor/:param" element={ <ResultsTurpor /> } /> 

                    <Route path="/results/techet/:param" element={ <ResultsTechET /> } /> 
                    <Route path="/results/techte/:param" element={ <ResultsTechTE /> } />
                    <Route path="/" element={ <IndexEmptyComp /> } />
                </Routes>
            </div>
        </Router>
    );
}
export default App;
 