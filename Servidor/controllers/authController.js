const Usuario = require('../models/Usuario')
const bcrypts = require('bcryptjs')
const {validationResult}= require('express-validator')
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async(req, res) =>{
      //Revisar si hay errores
      const errores = validationResult(req);
      if(!errores.isEmpty()){
          return res.status(400).json({errores: errores.array()})
      }

        //extraer rol email y password
        const {rol, email, password} = req.body;

        try {
        //Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe'});

        }


        //Revisar el password
        const passCorrecto = await bcrypts.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg:'Password Incorrecto'})
        }


        
        if(rol !== usuario.rol){
            return res.status(400).json({msg:'Rol Incorrecto'})
        }

        //Si todo es correcto Crear y firmar el JWT
         const payload ={
            usuario:{
                id:usuario.id
            }

        };
        //Firmar el JWT
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 3600 // 1 hora
        },(error, token) => {
            if(error) throw error;
            
            //Mensaje de confirmacion
            res.json({ token});

        });
            
        } catch (error) {
            console.log(error)
        }
 
}

//Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async(req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error'})
        
    }
}
