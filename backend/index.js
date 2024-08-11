// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Flashcard schema and model
const flashcardSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

// CRUD routes for flashcards
app.get('/api/flashcards', async (req, res) => {
  const flashcards = await Flashcard.find();
  res.json(flashcards);
});

app.post('/api/flashcards', async (req, res) => {
  const flashcard = new Flashcard(req.body);
  await flashcard.save();
  res.json(flashcard);
});

app.put('/api/flashcards/:id', async (req, res) => {
  const flashcard = await Flashcard.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(flashcard);
});

app.delete('/api/flashcards/:id', async (req, res) => {
  await Flashcard.findByIdAndDelete(req.params.id);
  res.json({ message: 'Flashcard deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
