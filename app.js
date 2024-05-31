const express = require('express');
const bodyParser = require('body-parser');
const eventRouter = require('./routers/eventRouter.js');
const notFoundHandler = require('./middleware/notFoundHandler');
const errorHandler = require('./middleware/errorHandler');
const port = 3000;
const app = express();

app.use(bodyParser.json());

app.use('/api', eventRouter);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
