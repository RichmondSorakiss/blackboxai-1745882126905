const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for votes
const options = [
  { id: 1, name: 'Option A', votes: 0 },
  { id: 2, name: 'Option B', votes: 0 },
  { id: 3, name: 'Option C', votes: 0 }
];

// Endpoint to get voting options and current votes
app.get('/api/options', (req, res) => {
  res.json(options);
});

// Endpoint to submit a vote
app.post('/api/vote', (req, res) => {
  const { optionId } = req.body;
  const option = options.find(o => o.id === optionId);
  if (option) {
    option.votes += 1;
    res.json({ success: true, option });
  } else {
    res.status(400).json({ success: false, message: 'Invalid option ID' });
  }
});

app.listen(port, () => {
  console.log(`Voting app backend listening at http://localhost:${port}`);
});
