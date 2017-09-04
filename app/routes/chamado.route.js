const express = require('express');
const bodyParser = require('body-parser');
const Chamados = require('../models/chamados.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Constants = require('../constants');
const _ = require('lodash');

class ChamadosRoute {

  constructor() {
    this.chamados = new Chamados();
    this.parseUrlencoded = bodyParser.urlencoded({ extended: false });
    this.router = express.Router();
    this.initialize();
  }

  initialize() {
    this.router.route('/registro')
    .post(this.parseUrlencoded, this.registerChamado.bind(this));
  }

  registerChamado(req, res) {
		this.chamados.model.create(req.body, (err, chamados) => {
			err ? res.json({err: err}) : res.json({data: chamados});
		});
	}

}

module.exports = new ChamadosRoute().router;
