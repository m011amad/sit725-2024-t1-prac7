const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');


router.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

router.get('/api/cards', async (req, res) => {
  try {
    const cards = await controller.getAllCards();
    res.json({ statusCode: 200, data: cards, message: 'get all cards success' });
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
  }
});


router.post('/api/cards', async (req, res) => {
  try {
    const newCard = req.body;
    await controller.postCard(newCard);
    res.status(201).json({ statusCode: 201, message: 'New card added successfully' });
  } catch (error) {
    console.error("Error adding new card:", error);
    res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
  }
});


module.exports = router;
