require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
let messages = [
    { role: "system", content: "You reply with less than 400 characters." }
];

app.use(cors()); // enable CORS for all origins
app.use(express.json()); // for parsing application/json

app.post('/api/chat', async (req, res) => {
  try {
    const { user_message } = req.body;
    //add system message for role. Make new endpoint for this
    messages.push(user_message[0]);
    messages.push(user_message[1]);
    console.log(messages);
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });

    response_ind_0 = completion.choices[0];
    console.log(response_ind_0);
    res.json(response_ind_0);
  } catch (error) {
    res.status(500).send('Error processing your request');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
