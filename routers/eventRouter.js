const express = require('express');
const EventController = require('../controllers/eventController.js');
const router = express.Router();

router.get('/events', EventController.index);
router.post('/events', EventController.store);
router.put('/events/:event', EventController.update);

module.exports = router;
