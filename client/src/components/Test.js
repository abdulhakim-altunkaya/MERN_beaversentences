import React, { useEffect, useState } from 'react';

function Test() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api')
            .then(res => res.json())
            .then(data => setData(data.message))
            .catch(err => console.error("Error fetching data: ", err));
    }, []);

    return (
        <div>
            <h2>Test Component</h2>
            {data ? <p>{data}</p> : <p>Loading...</p>}
        </div>
    );
}

export default Test;
