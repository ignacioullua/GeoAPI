const mongoose = require('mongoose');




const geoInfoSchema = mongoose.Schema({
   
    id: mongoose.Schema.Types.ObjectId, 
    calle: {type: String},
    numero: {type: String},
    ciudad: {type: String},
    codigo_postal: {type: String},
    provincia: {type: String},
    pais: {type: String},
    resultado: {
        latitud: {type: String},
        longitud: {type: String},
        estado: {type: String, default:"PROCESANDO"},
    }
});


module.exports = mongoose.model('geoInfo', geoInfoSchema);