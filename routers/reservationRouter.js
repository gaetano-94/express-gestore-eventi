const express = require('express');
const ReservationController = require('../controllers/reservationController');

const router = express.Router();

router.get('/events/:event/reservations', ReservationController.index);
router.post('/events/:event/reservations', ReservationController.store);
router.delete(
  '/events/:event/reservations/:reservation',
  ReservationController.destroy
);

module.exports = router;
