class EventController {
  static index(req, res) {
    // TODO: Implementare la logica per recuperare tutti gli eventi
    res.send('GET events/ - Lista di tutti gli eventi');
  }

  static store(req, res) {
    // TODO: Implementare la logica per creare un nuovo evento
    res.send('POST events/ - Creazione di un nuovo evento');
  }

  static update(req, res) {
    // TODO: Implementare la logica per aggiornare un evento esistente
    res.send('PUT events/:event - Aggiornamento di un evento esistente');
  }
}

module.exports = EventController;
