const express = require('express');
const Users = require('../models/user.data.model');
const bodyParser = require('body-parser');
const Constants = require('../constants');

class UserRoute {

  constructor() {
    this.users = new Users();
    this.router = express.Router();
    this.parseUrlencoded = bodyParser.urlencoded({ extended: false });
    this.initialize();
  }

  initialize() {
    this.router.route('/save')
      .post(this.parseUrlencoded, this.saveUser.bind(this));

    this.router.route('/check')
      .post(this.parseUrlencoded, this.check.bind(this));

    this.router.route('/researched')
    .post(this.parseUrlencoded, this.getUserRecentSearch.bind(this));

  }

  //Save unloged users from Lopes
  saveUser(req, res) {
    this.users.model.create(req.body, (err, user) => {
      err ? res.json({ err: err }) : res.json({ data: user });
    });
  }

  getUserRecentSearch(req, res) {
    
    let user_id = req.body.user_id;

    this.users.model.find({
      user_id: user_id, 
      searchTerms: {$exists: true}
    }, {$limit: 3}
    , (err, data) =>  {
      err ? res.json({err: err}) : res.json({data: data});
    }).sort({date: -1}).limit(3).select("searchTerms");
  }

  check(req, res) {
    this.users.model.find({ idRegistro: req.body.id }, (err, users) => {
      !err ? res.json({ users:  users}) : res.json({ data: [], err: err, messsage: "Nenhum usuário encontrado" });
    });
  }

}

module.exports = new UserRoute().router;
