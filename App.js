import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // For custom styling (if needed)

const App = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            const data = JSON.parse(input);
            const res = await axios.post('https://testbfhl.herokuapp.com/bfhl', { data });
            setResponse(res.data);
            setError(null);
        } catch (err) {
            setError('Invalid JSON input');
        }
    };

    const handleSelectChange = (event) => {
        setSelectedOptions([...event.target.selectedOptions].map(option => option.value));
    };

    const renderResponse = () => {
        if (!response) return null;

        const { numbers, alphabets, highest_lowercase_alphabet } = response;

        return (
            <div>
                {selectedOptions.includes('Numbers') && (
                    <div><strong>Numbers:</strong> {numbers.length > 0 ? numbers.join(', ') : 'None'}</div>
                )}
                {selectedOptions.includes('Alphabets') && (
                    <div><strong>Alphabets:</strong> {alphabets.length > 0 ? alphabets.join(', ') : 'None'}</div>
                )}
                {selectedOptions.includes('Highest lowercase alphabet') && (
                    <div><strong>Highest lowercase alphabet:</strong> {highest_lowercase_alphabet.length > 0 ? highest_lowercase_alphabet.join(', ') : 'None'}</div>
                )}
            </div>
        );
    };

    return (
        <div className="container">
            <h1>21BKT0078</h1>
            <textarea
                className="input-field"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Enter JSON here'
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <div className="error">{error}</div>}
            <select multiple onChange={handleSelectChange} className="dropdown">
                <option value="Numbers">Numbers</option>
                <option value="Alphabets">Alphabets</option>
                <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
            {renderResponse()}
        </div>
    );
};

export default App;
