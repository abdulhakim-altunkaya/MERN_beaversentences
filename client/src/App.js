import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Test from './components/Test';
import Home from './components/Home';
function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/test">Test</Link>
                        </li>
                    </ul>
                </nav>
                
                <Routes>
                    <Route path="/test" element={ <Test /> } />
                    <Route path="/" element={ <Home /> } />
                </Routes>
            </div>
        </Router>
    );
}
export default App;
