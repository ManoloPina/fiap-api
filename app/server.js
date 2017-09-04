const Express = require('express');
const MainRouter = require('./routes/main.route');
const AuthRoute = require('./routes/auth.route');
const ChamadosRoute = require('./routes/chamado.route');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Connection = require('./models/connection');
const Constants = require('./constants');
const cors = require('cors');

class Server {

  constructor() {
    this.express = Express();
    this.initialize();
  }

  initialize() {
    this.express.use(expressJWT({secret: Constants.JWT_TOKEN}).unless({path: ['/auth']}));
    this.express.use(cors());
    this.express.use(this.handleError.bind(this));
    this.express.use(bodyParser.json());
    this.express.use('/', MainRouter);
    this.express.use('/chamados', ChamadosRoute);
    this.express.use('/auth', AuthRoute);
    this.express.listen(4500);
  }

  handleError(err, req, res, nex) {
    console.error(err.stack)
    res.status(500).json(err.stack);
  } 

}

new Server();