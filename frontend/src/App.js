import React, { useState } from 'react';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedData, setSelectedData] = useState([]);
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');

  // Handle the input change for JSON data
  const handleJsonInputChange = (e) => {
    setJsonData(e.target.value);
  };

  // Handle input change for full name
  const handleNameChange = (e) => {
    setFullName(e.target.value);
  };

  // Handle input change for DOB
  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  // Handle the POST request submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://127.0.0.1:5000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          data: JSON.parse(jsonData), 
          full_name: fullName,
          dob: dob
        }),
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const result = await res.json();
      setResponse(result);
      setSelectedData([]); // Reset selected data when a new response is received
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: error.message });
      setSelectedData([]);
    }
  };

  // Handle the GET request
  const handleGetRequest = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/bfhl', {
        method: 'GET',
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const result = await res.json();
      setResponse(result);
      setSelectedData([]); // Reset selected data when a new response is received
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: error.message });
      setSelectedData([]);
    }
  };

  // Handle data selection
  const handleDataSelect = (e) => {
    const selection = e.target.value;
    if (response) {
      switch (selection) {
        case 'Numbers':
          setSelectedData(response.numbers || []);
          break;
        case 'Alphabets':
          setSelectedData(response.alphabets || []);
          break;
        case 'Highest lowercase alphabet':
          setSelectedData(response.highest_lowercase_alphabet || []);
          break;
        default:
          setSelectedData([]);
          break;
      }
    }
  };

  return (
    <div className="App">
      <h1>JSON Input</h1>
      
      {/* Form to handle POST request */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={handleNameChange}
            placeholder="Enter Full Name"
          />
        </div>
        <div>
          <label>Date of Birth (DDMMYYYY):</label>
          <input
            type="text"
            value={dob}
            onChange={handleDobChange}
            placeholder="Enter DOB in DDMMYYYY format"
          />
        </div>
        <div>
          <label>JSON Data:</label>
          <textarea
            value={jsonData}
            onChange={handleJsonInputChange}
            rows="10"
            cols="50"
            placeholder='Enter JSON like {"data": ["A","B","1"]}'
          />
        </div>
        <br />
        <button type="submit">Submit POST Request</button>
      </form>

      {/* Button to handle GET request */}
      <br />
      <button type="button" onClick={handleGetRequest}>Get Operation Code</button>

      {/* Select dropdown to choose which data to display */}
      {response && response.hasOwnProperty('numbers') && response.hasOwnProperty('alphabets') && response.hasOwnProperty('highest_lowercase_alphabet') && (
        <div>
          <label>Select Data to Display:</label>
          <select onChange={handleDataSelect}>
            <option value="">--Select--</option>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
        </div>
      )}

      {/* Display the response */}
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {/* Display the selected data */}
      {selectedData.length > 0 && (
        <div>
          <h2>Selected Data:</h2>
          <pre>{JSON.stringify(selectedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
