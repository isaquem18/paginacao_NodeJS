const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const connection = require('./database/database');
const Users = require('./_users/users');

connection 
  .authenticate()
  .then()
  .catch();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res.json({pagina: 'inicio'})
});

const usersController = require('./_users/usersController');
app.use('/', usersController);

app.listen(port, (err) => {
  if (err) {
    console.log('server error!');
  } else {
    console.log('server started!');
  };
});