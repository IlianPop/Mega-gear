const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Tok = require('./pass');
const cors = require('cors');
const app = express();
app.use(cors());
mongoose.connect(Tok);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json());
app.use('/api', require('./api'));
app.listen(4000, () => {
  console.log('Сервер запущено');
});
