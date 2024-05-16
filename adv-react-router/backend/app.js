const bodyParser = require('body-parser');
const express = require('express');

const eventRoutes = require('./routes/events');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/events', eventRoutes);

app.post('/events', (req, res) => {
  const eventData = req.body;
  console.log(eventData);
  res.status(200).json({ message: 'Event data received and processed successfully' });
});


app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

app.listen(8080);
