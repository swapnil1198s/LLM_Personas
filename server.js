require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY }); //Used to authenticate the openai api access
let messages = [
    { role: "system", content: "You reply with less than 400 characters." } // Set limit to prevent excess token charges
];

app.use(cors()); 
app.use(express.json()); 

app.post('/api/chat', async (req, res) => {
  try {
    const { user_message } = req.body;
    
    messages[1] = user_message[0]; // Update the persona based on the current selected persona on the client side.
    messages.push(user_message[1]); // The actual message of the client to AI
    console.log(messages); // For dev
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });

    response_ind_0 = completion.choices[0]; 
    console.log(response_ind_0); //For dev
    res.json(response_ind_0);
  } catch (error) {
    res.status(500).send('Error processing your request');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
