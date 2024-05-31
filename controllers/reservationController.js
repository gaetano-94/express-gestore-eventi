const Event = require('../models/event.js');

class ReservationController {
  static async index(req, res) {
    try {
      const { event } = req.params;
      const reservations = await Reservation.getByEventId(event);
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async store(req, res) {
    try {
      const { event } = req.params;
      const { firstName, lastName, email } = req.body;

      const eventDetails = await Event.getById(event);

      if (new Date(eventDetails.date) < new Date()) {
        return res
          .status(400)
          .json({ error: 'Cannot book a reservation for a past event' });
      }

      const reservations = await Reservation.getByEventId(event);
      if (reservations.length >= eventDetails.maxSeats) {
        return res
          .status(400)
          .json({ error: 'No available seats for this event' });
      }

      const id = reservations.length
        ? reservations[reservations.length - 1].id + 1
        : 1;
      const newReservation = new Reservation(
        id,
        firstName,
        lastName,
        email,
        parseInt(event)
      );
      reservations.push(newReservation);
      await Reservation.saveAll(reservations);

      res.status(201).json(newReservation);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async destroy(req, res) {
    try {
      const { event, reservation } = req.params;
      const reservations = await Reservation.getByEventId(event);
      const reservationIndex = reservations.findIndex(
        (r) => r.id === parseInt(reservation)
      );

      if (reservationIndex === -1) {
        return res.status(404).json({ error: 'Reservation not found' });
      }

      reservations.splice(reservationIndex, 1);
      await Reservation.saveAll(reservations);

      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = ReservationController;
