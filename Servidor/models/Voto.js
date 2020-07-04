const mongoose = require('mongoose');

const VotoSchema = mongoose.Schema({
   
    //  voto:{
    //      type: String,
    //      required: true,
    //      trim: true
    //  },
   
     evento:{
         type: mongoose.Schema.Types.ObjectId,
          ref:'Evento'
        },

      nominado:{
          type: mongoose.Schema.Types.ObjectId,
          ref:'Nominado'
         },


       creador:{
           type: mongoose.Schema.Types.ObjectId,
           ref:'Usuario'
       },

    creado:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Voto', VotoSchema)