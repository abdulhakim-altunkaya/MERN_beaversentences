import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Read from './components/Read';
import Write from './components/Write';
import WriteEngpor from './components/WriteEngpor';
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import About from "./components/About";
import TestParams from "./components/TestParams";
import TestInput from "./components/TestInput";
import TestInput2 from "./components/TestInput2";

function App() {
    return (
        <Router>
            <div className='mainDiv'>
                <Navbar />
                <MainContent />
                <nav>
                    <ul>
                        <li>
                            <Link to="/write">Write to Database</Link>
                        </li>
                        <li>
                            <Link to="/read">Hello from Server</Link>
                        </li>
                        <li>
                            <Link to="/write1">Write ENGPOR</Link>
                        </li>
                        <li>
                            <Link to="/search">TEST PARAMS</Link>
                        </li>
                        <li>
                            <Link to="/test1">TEST INPUT</Link>
                        </li>
                        <li>
                            <Link to="/test2">TEST INPUT 2</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/read" element={ <Read /> } />
                    <Route path="/write" element={ <Write /> } />
                    <Route path="/about" element={ <About /> } />
                    <Route path="/write1" element={ <WriteEngpor /> } />
                    <Route path="/search/:param" element={ <TestParams /> } /> 
                    <Route path="/test1" element={ <TestInput /> } />
                    <Route path="/test2" element={ <TestInput2 /> } />
                    <Route path="/" element={ <WriteEngpor /> } />
                </Routes>
            </div>
        </Router>
    );
}
export default App;
/*In route search, make sure component param var name is also "param"*/