import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Read from './components/Read';
import Write from './components/Write';
import WriteEngpor from './components/WriteEngpor';
import Dropdown from './components/Dropdown';

function App() {
    return (
        <Router>
            <div className='mainDiv'>
                <nav>
                    <ul>
                        <li>
                            <Link to="/write">Write to Database</Link>
                        </li>
                        <li>
                            <Link to="/read">Hello from Server</Link>
                        </li>
                    </ul>
                </nav>
                <Dropdown />
                
                <Routes>
                    <Route path="/read" element={ <Read /> } />
                    <Route path="/write" element={ <Write /> } />
                    <Route path="/sentence" element={ <WriteEngpor /> } />
                    <Route path="/" element={ <WriteEngpor /> } />
                </Routes>
            </div>
        </Router>
    );
}
export default App;
