import React, { useState } from 'react';
import axios from 'axios';

function WriteEngpor() {
    const [sentenceEng, setSentenceEng] = useState('');
    const [sentencePor, setSentencePor] = useState('');

    const [sentenceEng2, setSentenceEng2] = useState('');
    const [sentenceGer, setSentenceGer] = useState('');

    const [sentenceEng3, setSentenceEng3] = useState('');
    const [sentenceTur, setSentenceTur] = useState('');

    const [sentenceEng4, setSentenceEng4] = useState('');
    const [sentenceEsp, setSentenceEsp] = useState('');

    const [sentenceTur2, setSentenceTur2] = useState('');
    const [sentenceGer2, setSentenceGer2] = useState('');

    const [sentenceEng5, setSentenceEng5] = useState('');
    const [sentenceTur3, setSentenceTur3] = useState('');

    const [sentencePor2, setSentencePor2] = useState('');
    const [sentenceTur4, setSentenceTur4] = useState('');


    const saveEngpor = async () => {
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

    const saveEngger = async () => {
        const response = await axios.post('http://localhost:5000/api/engger', { SentenceEng: sentenceEng2, SentenceGer: sentenceGer});
        console.log(response.data);
        alert("Data saved to the MongoDB");
        setSentenceEng2('');
        setSentenceGer('');
    };
    const saveEngesp = async () => {
        const response = await axios.post('http://localhost:5000/api/engesp', { SentenceEng: sentenceEng4, SentenceEsp: sentenceEsp});
        console.log(response.data);
        alert("Data saved to the MongoDB");
        setSentenceEng4('');
        setSentenceEsp('');
    };
    const saveEngtur = async () => {
        const response = await axios.post('http://localhost:5000/api/engtur', { SentenceEng: sentenceEng3, SentenceTur: sentenceTur});
        console.log(response.data);
        alert("Data saved to the MongoDB");
        setSentenceEng3('');
        setSentenceTur('');
    };
    const saveGertur = async () => { 
        const response = await axios.post('http://localhost:5000/api/gertur', { SentenceGer: sentenceGer2, SentenceTur: sentenceTur2});
        console.log(response.data);
        alert("Data saved to the MongoDB");
        setSentenceGer2('');
        setSentenceTur2('');
    };
    const saveTechet = async () => { 
        const response = await axios.post('http://localhost:5000/api/techet', { SentenceEng: sentenceEng5, SentenceTur: sentenceTur3});
        console.log(response.data);
        alert("Data saved to the MongoDB");
        setSentenceEng5('');
        setSentenceTur3('');
    };
    const savePortur = async () => { 
        const response = await axios.post('http://localhost:5000/api/portur', { SentencePor: sentencePor2, SentenceTur: sentenceTur4});
        console.log(response.data);
        alert("Data saved to the MongoDB");
        setSentencePor2('');
        setSentenceTur4('');
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
            <button onClick={saveEngpor}>Save ENGPOR</button>
            <br/><br/>

            <input 
                type="text" 
                value={sentencePor2}
                onChange={(e) => setSentencePor2(e.target.value)}
                placeholder="Enter Portuguese sentence..."
            />
            <input 
                type="text" 
                value={sentenceTur4}
                onChange={(e) => setSentenceTur4(e.target.value)}
                placeholder="Enter Turkish sentence..."
            />
            <button onClick={savePortur}>Save PORTUR</button>
            <br/><br/>

            <input 
                type="text" 
                value={sentenceEng2}
                onChange={(e) => setSentenceEng2(e.target.value)}
                placeholder="Enter English sentence..."
            />
            <input 
                type="text" 
                value={sentenceGer}
                onChange={(e) => setSentenceGer(e.target.value)}
                placeholder="Enter German sentence..."
            />
            <button onClick={saveEngger}>Save ENGGER</button>
            <br/><br/>

            <input 
                type="text" 
                value={sentenceEng4}
                onChange={(e) => setSentenceEng4(e.target.value)}
                placeholder="Enter English sentence..."
            />
            <input 
                type="text" 
                value={sentenceEsp}
                onChange={(e) => setSentenceEsp(e.target.value)}
                placeholder="Enter Spanish sentence..."
            />
            <button onClick={saveEngesp}>Save ENGESP</button>
            <br/><br/>

            <input 
                type="text" 
                value={sentenceEng3}
                onChange={(e) => setSentenceEng3(e.target.value)}
                placeholder="Enter English sentence..."
            />
            <input 
                type="text" 
                value={sentenceTur}
                onChange={(e) => setSentenceTur(e.target.value)}
                placeholder="Enter Turkish sentence..."
            />
            <button onClick={saveEngtur}>Save ENGTUR</button>
            <br/><br/>

            <input 
                type="text" 
                value={sentenceGer2}
                onChange={(e) => setSentenceGer2(e.target.value)}
                placeholder="Enter German sentence..."
            />
            <input 
                type="text" 
                value={sentenceTur2}
                onChange={(e) => setSentenceTur2(e.target.value)}
                placeholder="Enter Turkish sentence..."
            />
            <button onClick={saveGertur}>Save GERTUR</button>
            <br/><br/>


            <input 
                type="text" 
                value={sentenceEng5}
                onChange={(e) => setSentenceEng5(e.target.value)}
                placeholder="Enter English sentence..."
            />
            <input 
                type="text" 
                value={sentenceTur3}
                onChange={(e) => setSentenceTur3(e.target.value)}
                placeholder="Enter Turkish sentence..."
            />
            <button onClick={saveTechet}>Save TECH</button>
            <br/><br/>
        </div>
    );
}
export default WriteEngpor;