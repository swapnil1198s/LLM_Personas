import React, { useState } from 'react';
import axios from 'axios';
import "../src/App.css";
function App() {
  const [response, setResponse] = useState('');
  const [input, setInput] = useState('');
  const [persona, setPersona] = useState(null);

  const handlePersonaChange = (e) =>{
    let new_person = e.target.dataset.id;
    setPersona(new_person);
    setResponse(null);
  }

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let persona_content = "You are a " + persona;
      console.log(persona_content)
      const result = await axios.post('http://localhost:3001/api/chat', {
        user_message: [{ role: "system", content: persona_content },
        { role: "user", content: input }]
      });
      console.log(result);
      setResponse(result.data.message.content);
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Failed to get response');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Select the AI's persona:</h1>
        <div className='persona_selection'>
          <div className='persona' data-id="Police Responder" onClick={handlePersonaChange}>
            <h1 data-id="Police Responder">Police Responder</h1>
          </div>
          <div className='persona' data-id="Fire Responder" onClick={handlePersonaChange}>
            <h1 data-id="Fire Responder">Fire Responder</h1>
          </div>
          <div className='persona' data-id="Hazmat Responder" onClick={handlePersonaChange}>
            <h1 data-id="Hazmat Responder">Hazmat Responder</h1>
          </div>
        </div>
        <form onSubmit={handleFormSubmit}>
          <input type="text" value={input} className='text_input' onChange={handleInputChange} />
          <button className='submit_btn' type="submit">Send</button>
        </form>
        <p>{persona}:</p>
        <div className='response'>
          <p>{response}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
