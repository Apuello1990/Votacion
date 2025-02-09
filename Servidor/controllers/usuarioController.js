const Usuario = require('../models/Usuario')
const bcrypts = require('bcryptjs')
const {validationResult}= require('express-validator')
const jwt = require('jsonwebtoken');


exports.crearUsuario = async(req, res) =>{

    //Reviar si hay errores
    const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()})
     }

    //extraer email y password
    const { email, password} = req.body;

    
    try {

        //Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'});

        }

        //crea el nuevo usuario
        usuario = new Usuario(req.body);
        

        //Hashear el password
        const salt = await bcrypts.genSalt(10);
        usuario.password = await bcrypts.hash(password, salt);

        //guardar usuario
        await usuario.save()

        //Crear y firmar el JWT
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
        console.log(error);
        res.status(400).send('Hubo un error');
        
    }
}

 exports.obtenerUsuarioNominados = async(req, res) =>{
     try {
         //Trae todo los eventos del creador y los ordena del mas reciente
         const usuarios = await Usuario.find({rol: 'nominado' })
         res.json({usuarios})
     } catch (error) {
         console.log(error)
         res.status(500).send('Hubo un error')
     }
 }