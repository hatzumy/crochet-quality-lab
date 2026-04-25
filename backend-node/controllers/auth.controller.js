import User from '../models/User.js';
import Token from '../models/Token.js';
import { z } from 'zod';
import crypto from 'node:crypto';
import 'dotenv/config';
import { sendVerificationEmail } from '../utils/n8nService.js';

//Reglas (Criterios de aceptacion)
import {registerSchema, verifyTokenSchema} from '../schemas/auth.schema.js'; 


export const register = async (req, res) => {
  try {
    const validateData = registerSchema.parse(req.body);
    const {username, email, password} = validateData;
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      const field = userExists.email === email ? 'correo' : 'nombre de usuario';
      return res.status(400).json({ message: `Este ${field} ya está en uso` });
    }
  
    //Guardado en BD 
    const newUser = new User({ 
      username, 
      email, 
      password
    });
    const userSaved = await newUser.save(); 

    const verificationToken = crypto.randomBytes(32).toString('hex');

    const newToken = new Token({
      userId: userSaved._id,
      token: verificationToken
    });

    const tokenSaved = await newToken.save();

      sendVerificationEmail({
        email: userSaved.email,
        username: userSaved.username,
        token: verificationToken,
        userId: userSaved._id
      })
      
    res.status(201).json({
      username: userSaved.username,
      email: userSaved.email,
      token: tokenSaved.token,
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
    const tokenDoc = await Token.findOne({ token: String(token) });
    
    if (!tokenDoc) {
      return res.status(400).json({ message: 'El token es inválido o ya ha expirado.' });
    }

    const user = await User.findById(tokenDoc.userId);

    if (!user) {
      return res.status(404).json({ message: 'No se encontró la cuenta asociada al token.' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Esta cuenta ya ha sido verificada anteriormente.' });
    }

    user.isVerified = true;
    await user.save();
    await Token.findByIdAndDelete(tokenDoc._id);
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

export const resendEmail = async (req, res) =>{
  try{
    const {email} = req.body;
    if (!email) {
      return res.status(400).json({ message: 'El correo electrónico es requerido.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No existe el usuario' });
    }
    if (user.isVerified){
      return res.status(400).json({ message: 'Cuenta ya verificada' });
    }
    await Token.deleteMany({ userId: user._id });
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const newToken = new Token({
      userId: user._id,
      token: verificationToken
    });
    await newToken.save();

    sendVerificationEmail({
        email: user.email,
        username: user.username,
        token: verificationToken,
        userId: user._id
      })

    res.status(200).json({ 
      message: 'Se ha enviado un nuevo enlace de verificación a tu correo.' 
    });

  }catch (error){
    res.status(500).json({ message: error.message });
  }
};
