const Connection = require('./connection');

class Chamados extends Connection {
  constructor() {
    super();
    this.schema = this.mongoose.Schema({
			codigo_funcionario: {type: Number, required: true},
			tipo_chamado: {type: String, enum: ["Troca de aparelho", "Nova instalação", "Retirada de aparelho"], required: true},
			finalizado: {type: Boolean, require: true}
    });

    this.model = this.connection.model('Chamados', this.schema);
  }
}

module.exports = Chamados;
