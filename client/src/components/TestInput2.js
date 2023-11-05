import React, { useState } from 'react';
import axios from 'axios';

function TestInput2() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/sentences/search?word=${searchQuery}`);

      if (response.status === 200) {
        const data = response.data;
        setSearchResults(data);
      } else {
        console.error('Error searching for results');
      }
    } catch (error) {
      console.error('Error searching for results:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a search query"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      
      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result.sentenceText}</li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default TestInput2;
