const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Signup Route
app.post('/signup', (req, res) => {
  //
  const { pregunta_1, pregunta_2, pregunta_3, pregunta_4, pregunta_5, pregunta_6, pregunta_7, pregunta_8, firstName, lastName, email } = req.body;
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
