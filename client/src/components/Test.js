import React, { useState } from 'react';
import axios from 'axios';

function Test() {
    const [inputData, setInputData] = useState('');

    const sendDataToServer = async () => {
        try {
            const response = await axios.post('/api', { content: inputData });
            console.log(response.data);
        } catch (error) {
            console.error('There was an error sending data', error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
            />
            <button onClick={sendDataToServer}>Submit</button>
        </div>
    );
}

export default Test;
