const express = require('express');
const app = express();
const cors = require('cors')

const pdfRoute = require('./routes/pdfRoutes')


app.use(cors());
app.use(express.json());
app.use('/api/pdf', pdfRoute);
app.use('/api/query', queryRoutes);


app.get('/health', (req, res) => {
  res.json({status: 'ok'});
});


module.exports = app;