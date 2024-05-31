const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/events.json');

class Event {
  constructor(id, title, description, date, maxSeats) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.maxSeats = maxSeats;
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) return reject(err);
        resolve(JSON.parse(data));
      });
    });
  }

  static saveAll(events) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(events, null, 2), (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = Event;
