import User from "../models/User.js";//Modelo de la BD
import bcrypt from 'bcryptjs';//Encriptacion 
import { z } from 'zod';

//Reglas (Criterios de aceptacion)
import {registerSchema} from '../schemas/auth.schema.js'; 

export const register = async (req, res) => {
    try {
        const validateData = registerSchema.parse(req.body);
        const {username, email, password} = validateData;

        const userFound = await User.findOne({email});//Busca email en BD
        const usernameFound = await User.findOne({username});//Busca username en BD
        if(userFound){
            return res.status(400).json({ message: "Este correo ya esta en uso en CrochetLab"});
        }else if (usernameFound){
            return res.status(400).json({ message: "Este nombre de usuario ya esta en uso en CrochetLab"});
        }

        const passwordHash = await bcrypt.hash (password, 10);//Encripta la contraseña
        //Guardado en BD 
        const newUser = new User({ 
            username, 
            email, 
            password: passwordHash
        });

        const userSaved = await newUser.save(); 

        res.status(201).json({
            id: userSaved.id,
            username: userSaved.username,
            email: "¡Usuario registrado exitosamente"
        });
    } catch (error) {
        if(error instanceof z.ZodError){
            return res.status(400).json({
                message: "Error de validacion",
                errors: error.errors ? error.errors.map(e => e.message) : [error.message]
            });
        }
        console.error(error);
        res.status(500).json({message: error.message});
    }  
};

