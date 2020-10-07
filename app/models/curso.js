const mongoose = require('mongoose');

module.exports = () => {
    let schema = mongoose.Schema({
        curso: { type: String, required: true },
        coordenador: { type: String, required: true }
    });
    return mongoose.model('Curso', schema);
}