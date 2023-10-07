import React, { useState } from 'react';
import axios from 'axios';

function Write() {
    const [inputData, setInputData] = useState('');

    const sendDataToServer = async () => {
        try {
            const response = await axios.post('/write', { content: inputData });
            console.log(response.data);
            alert("Data saved to the MongoDB")
            setInputData(''); // Clear the input after successful save
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
                placeholder="Enter data..."
            />
            <button onClick={sendDataToServer}>Save to MongoDB</button>
        </div>
    );
}

export default Write;
