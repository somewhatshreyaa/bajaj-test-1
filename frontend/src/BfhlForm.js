import React, { useState } from 'react';
import axios from 'axios';
import './BfhlForm.css'; // Import the CSS file

function BfhlForm() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const result = await axios.post('http://localhost:3000/bfhl', parsedInput);
      setResponse(result.data);
    } catch (err) {
      setError('Invalid JSON input or API error');
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    let filteredResponse = {};

    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }
    
    // return <pre>{JSON.stringify(response, null, 2)}</pre>;
    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="bfhl-form">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON here. Example: { "data": ["A","C","z"] }'
          className="input-area"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {response && (
        <div>
          <select
            multiple
            value={selectedOptions}
            onChange={(e) => setSelectedOptions(Array.from(e.target.selectedOptions, option => option.value))}
            className="select-options"
          >
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default BfhlForm;
