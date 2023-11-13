import React, { useState } from 'react';
import axios from 'axios';

function WriteEngtur() {

    let [sentenceEng, setSentenceEng] = useState("");
    let [sentenceTur, setSentenceTur] = useState("");

    const saveSentences = async () => {
        
        try {
            const response = await axios.post('http://localhost:5000/engtur', { SentenceEng: sentenceEng, SentenceTur: sentenceTur});
            console.log(response.data.message);
            setSentenceEng("");
            setSentenceTur("");
            alert("data saved to mongodb", response.data.message);
        } catch (error) {
            console.log("react error: ", error.message)
        }
    }

    return (
        <div>
            <input type='text'
                placeholder='enter english sentence'
                value={sentenceEng}
                onChange={e => setSentenceEng(e.target.value)} />
            <input type='text'
                placeholder='enter turkish sentence'
                value={sentenceTur}
                onChange={e => setSentenceTur(e.target.value)} />
            <button onClick={saveSentences}>SAVE TO ENGTUR</button>
        </div>
    )
}

export default WriteEngtur