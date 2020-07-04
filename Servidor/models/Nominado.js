const mongoose = require('mongoose');

const NominadoSchemma = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
      },

      
    creado:{
        type: Date,
        default: Date.now()

    },
    evento:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Evento'

    },

     voto:{
         type: Number,
         default: 0
        
     }
})

module.exports = mongoose.model('Nominado', NominadoSchemma)