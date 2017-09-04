const express = require('express');

class MainRoute {

  constructor() {
    this.router = express.Router();
    this.initialize();
  }

  initialize() {
    this.router.route('/')
    .get(this.checkAuth.bind(this));
  }

  checkAuth(req, res) {
    res.json(`Your session is working!!!`);
  }

} 

module.exports = new MainRoute().router;
