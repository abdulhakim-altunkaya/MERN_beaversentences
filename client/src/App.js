import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Read from './components/Read';
import Write from './components/Write';
function App() {
    return (
        <Router>
            <div>
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
                
                <Routes>
                    <Route path="/read" element={ <Read /> } />
                    <Route path="/write" element={ <Write /> } />
                    <Route path="/" element={ <Write /> } />
                </Routes>
            </div>
        </Router>
    );
}
export default App;
