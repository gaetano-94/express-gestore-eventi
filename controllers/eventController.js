const Event = require('../models/event.js');
class EventController {
  static async index(req, res) {
    try {
      const events = await Event.getAll();

      // Filtraggio in base ai query params
      const filteredEvents = events.filter((event) => {
        let matches = true;
        if (
          req.query.title &&
          !event.title.toLowerCase().includes(req.query.title.toLowerCase())
        ) {
          matches = false;
        }
        if (req.query.date && event.date !== req.query.date) {
          matches = false;
        }
        return matches;
      });

      res.json(filteredEvents);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async store(req, res) {
    try {
      const { title, description, date, maxSeats } = req.body;
      if (!title || !description || !date || maxSeats === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const events = await Event.getAll();
      const id = events.length ? events[events.length - 1].id + 1 : 1;
      const newEvent = new Event(id, title, description, date, maxSeats);
      events.push(newEvent);
      await Event.saveAll(events);
      res.status(201).json(newEvent);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async update(req, res) {
    try {
      const { event } = req.params;
      const { title, description, date, maxSeats } = req.body;

      if (!title || !description || !date || maxSeats === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const events = await Event.getAll();
      const eventIndex = events.findIndex((e) => e.id === parseInt(event));

      if (eventIndex === -1) {
        return res.status(404).json({ error: 'Event not found' });
      }

      events[eventIndex] = {
        ...events[eventIndex],
        title,
        description,
        date,
        maxSeats,
      };
      await Event.saveAll(events);
      res.json(events[eventIndex]);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = EventController;
