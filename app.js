const express = require('express');
const bodyParser = require('body-parser');
const eventRouter = require('./routers/eventRouter.js');
const port = 3000;
const app = express();

app.use(bodyParser.json());

app.use('/api', eventRouter);

app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
