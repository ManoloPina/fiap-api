const Connection = require('./connection');

class AppAuthModel extends Connection {
  constructor() {
    super();
    this.schema = this.mongoose.Schema({
      name: {type: String, required: true, unique: true},
      password: {type: String, required: true}
    });
    this.model = this.connection.model('Authorizations', this.schema);
  } 
}

module.exports = AppAuthModel;
