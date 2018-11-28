const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Signup Route
app.post('/signup', (req, res) => {
  // We save the the values sent from the html file into independent variables
  const{pregunta_1, pregunta_2, pregunta_3, pregunta_4, pregunta_5, pregunta_6,
  pregunta_7, pregunta_8, firstName, lastName, email, terminos, newsletter} = req.body;

  // Make sure fields are filled
  if (!firstName || !lastName || !email || !terminos) {
    res.redirect('/fail.html');
    return;
  }
  // check if user want to be in the Newsletter
  // confirmamos que el usuario quiere ser parte del newsletter

  var MongoClient = require('mongodb').MongoClient;

  var uri = "mongodb+srv://luis_alarcon:MDawwjoqQ3jFQr9y@cluster0-prw1g.mongodb.net/test?retryWrites=true";
  MongoClient.connect(uri, function(err, client) {
    if (err) throw err;
    const collection = client.db("Grupo-G").collection("actitud_free_test");
    // Data to be inserted
    const data = {
      name: firstName,
      surname: lastName,
      email_address: email,
      termino: terminos,
      actitud_test : {
        p1 : pregunta_1,
        p2 : pregunta_2,
        p3 : pregunta_3,
        p4 : pregunta_4,
        p5 : pregunta_5,
        p6 : pregunta_6,
        p7 : pregunta_7,
        p8 : pregunta_8
        }
      };
      collection.insertOne(data, function(err, res) {
      if (err) throw err;
      console.log("Document inserted");
    });
    // close the connection to db when you are done with it
    client.close();
  });
  if (!newsletter){
    console.log("hi")
    console.log(newsletter)
    const options = {};

    request(options, (err, response, body) => {
      if (err) {
        res.redirect('/fail.html');
      } else {
        if (response.statusCode === 200) {
          res.redirect('/success_test.html');
        } else {
          res.redirect('/fail.html');
        }
      }
    });
  } else {
    console.log("hi")
    console.log(newsletter)
    const options = {};
    request(options, (err, response, body) => {
      if (err) {
        res.redirect('/fail.html');
      } else {
        if (response.statusCode === 200) {
          res.redirect('/success_newsletter.html');
        } else {
          res.redirect('/fail.html');
        }
      }
    });
  }



});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
