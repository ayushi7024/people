import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Person from './Models/person.js';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://ayushishukla7024:Hd1aJiYQwWaIL1Mx@cluster0.dqcft.mongodb.net/people', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully :)');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes

// GET /person: Get all people
app.get('/person', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST /person: Add a new person
app.post('/person', async (req, res) => {
  const { name, age, gender, mobile } = req.body;
  try {
    const newPerson = new Person({ name, age, gender, mobile });
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT /person/:id: Update a person by ID
app.put('/person/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, gender, mobile } = req.body;
  try {
    const updatedPerson = await Person.findByIdAndUpdate(id, { name, age, gender, mobile }, { new: true });
    res.json(updatedPerson);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE /person/:id: Delete a person by ID
app.delete('/person/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Person.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
