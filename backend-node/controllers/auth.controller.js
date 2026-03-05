import User from '../models/User.js';//Modelo de la BD
import { z } from 'zod';
import crypto from 'node:crypto';

//Reglas (Criterios de aceptacion)
import {registerSchema, verifyTokenSchema} from '../schemas/auth.schema.js'; 


export const register = async (req, res) => {
  try {
    const validateData = registerSchema.parse(req.body);
    const {username, email, password} = validateData;
    const userFound = await User.findOne({email});//Busca email en BD
    const usernameFound = await User.findOne({username});//Busca username en BD
    if(userFound){
      return res.status(400).json({ message: 'Este correo ya esta en uso en CrochetLab'});
    }else if (usernameFound){
      return res.status(400).json({ message: 'Este nombre de usuario ya esta en uso en CrochetLab'});
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    //Guardado en BD 
    const newUser = new User({ 
      username, 
      email, 
      password,
      verificationToken
    });

    const userSaved = await newUser.save(); 

    res.status(201).json({
      id: userSaved.id,
      username: userSaved.username,
      email: userSaved.email,
      token: verificationToken,
      message: '¡Usuario registrado exitosamente'
    });
  } catch (error) {
    if(error instanceof z.ZodError){
      return res.status(400).json({
        message: 'Error de validacion',
        errors: error.errors ? error.errors.map(e => e.message) : [error.message]
      });
    }
    res.status(500).json({message: error.message});
  }  
};

export const verifyEmail = async (req, res) =>{

  try {
    const result = verifyTokenSchema.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({ 
        message: result.error.issues[0].message // Retorna 'auth.token_invalid' o 'auth.token_required'
      });
    }
    const {token} = result.data;
    const user = await User.findOne({
      verificationToken: {$eq: String(token)}
    });
    if (!user) {
      return res.status(400).json({ message: 'El token es inválido o ya ha expirado.' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: '¡Cuenta verificada con exito!'});
  }
  catch (error) {
    // Mandarlo a Postman temporalmente para leerlo
    res.status(500).json({ 
      message: 'Error al verificar el correo.', 
      detalle: error.message 
    });
        
  }
};
