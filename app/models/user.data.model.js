const Connection = require('./connection');

class Users extends Connection {
  constructor() {
    super();
    this.schema = this.mongoose.Schema({
      user_id: {type: Number, required: true},
      session_id: {type: Number, required: true},
      date: {type: Date, required: true},
      page_type: {type: String, required: true},
      url: {type: String, required: true},
      location: {type:Object, required: true},
      go_to: String,
      search_result: {
        content: Object,
        negociation: Boolean,
        type: String,
      },
      name: String,
      telefone: String,
      email: String,
      login: {type: Boolean, default: false},
      searchTerms: Object
    });

    this.model = this.connection.model('Users', this.schema);
  }
}

module.exports = Users;
