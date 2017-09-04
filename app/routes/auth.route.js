const express = require('express');
const bodyParser = require('body-parser');
const AppAuthModel = require('../models/app.auth.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Constants = require('../constants');
const _ = require('lodash');

class AuthRoute {

  constructor() {
    this.appAuthModel = new AppAuthModel();
    this.parseUrlencoded = bodyParser.urlencoded({ extended: false });
    this.router = express.Router();
    this.initialize();
  }

  initialize() {
    this.router.route('/')
    .post(this.parseUrlencoded, this.getAuth.bind(this));
    
  }

  getAuth(req, res) {

    let params = req.body;
      
    this.appAuthModel.model.findOne({ name: params.name }, (err, auth) => {
      if (!_.isNull(auth)) {
        bcrypt.compare(params.password, auth.password, (err, result) => {
          let tokenObj = { token: jwt.sign({ name: req.body.name }, Constants.JWT_TOKEN) };
          let errorObj = { token: '', error: 'the password not match with the application name' };
          !err ? res.json(tokenObj) : res.json(errorObj);
        });
      } else {
        res.json({ error: 'The application names was not found.' });
      }

    });
  }

}

module.exports = new AuthRoute().router;


