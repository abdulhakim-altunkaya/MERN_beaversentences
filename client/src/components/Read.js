import React, { useState } from 'react';
import axios from 'axios';

function Read() {
    const [serverResponse, setServerResponse] = useState(null);

    const fetchDataFromServer = async () => {
        try {
            const response = await axios.get('/readdata');
            setServerResponse(response.data);
        } catch (error) {
            console.error('There was an error fetching data', error.message);
        }
    };

    return (
        <div>
            <button onClick={fetchDataFromServer}>Fetch Data</button>
            <div>
                {serverResponse ? (
                    <pre>{JSON.stringify(serverResponse, null, 2)}</pre>
                ) : (
                    <p>No response fetched</p>
                )}
            </div>
        </div>
    );
}

export default Read;
