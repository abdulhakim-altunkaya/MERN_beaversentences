import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Test() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('/api')
            .then(response => {
                setMessage(response.data.message);
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {message}
            </header>
        </div>
    );
}

export default Test;
