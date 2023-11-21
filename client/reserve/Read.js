import React, { useEffect, useState } from 'react';

function Read() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('http://localhost:5000/readfromserver')
        .then(res => {
            console.log(res);
            return res.json();
         })
         .then(data => setData(data.message))
         .catch(err => console.error("Error fetching data: ", err.message));
    }, []);
    return (
        <div>
            <h2>Test Component</h2>
            {data ? <p>{data}</p> : <p>Loading...</p>}
        </div>
    );
}
export default Read;
 