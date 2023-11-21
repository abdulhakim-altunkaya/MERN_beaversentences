import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

function WriteEngpor() {
    const [sentenceEng, setSentenceEng] = useState('');
    const [sentencePor, setSentencePor] = useState('');

    let pairId = useSelector( (state) => state.pair)
    let [reduxValue, setReduxValue] = useState("");

    const sendDataToServer = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/engpor', { SentenceEng: sentenceEng, SentencePor: sentencePor});
            console.log(response.data);
            alert("Data saved to the MongoDB");
            setSentenceEng('');
            setSentencePor('');
        } catch (error) {
            console.error('There was an error sending data', error);
        }
    };
    
    return (
        <div> 
            <input 
                type="text" 
                value={sentenceEng}
                onChange={(e) => setSentenceEng(e.target.value)}
                placeholder="Enter English sentence..."
            />
            <input 
                type="text" 
                value={sentencePor}
                onChange={(e) => setSentencePor(e.target.value)}
                placeholder="Enter Portuguese sentence..."
            />
            <button onClick={sendDataToServer}>Save to MongoDB</button>
            <p>{pairId}</p>
        </div>
    );
}
export default WriteEngpor;