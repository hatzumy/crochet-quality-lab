
import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: "El nombre de usuario es obligatorio"
    })
        .min(3, "El nombre debe contener mas de 3 letras")
        .max(15, "El nombre debe contener menos de 18 letras")
        .regex(/^[a-zA-ZñÑ0-9_-]+$/, { 
            message: "El usuario solo puede contener letras y números (sin espacios)" 
        })
        .trim(),
//EMAIL: Regex Robusta (Estándar RFC 5322 simplificado)
    email: z.string({
        required_error: "El correo es obligatorio"
    })
        .regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Correo inválido o formato no soportado"),

    password: z.string({ required_error: "La contraseña es obligatoria" })
    .min(8, "La contraseña debe tener al menos 8 caracteres") // Estándar actual
    .max(20, "La contraseña es demasiado larga") // Prevención de ataque DoS (Buffer Overflow)
    .regex(/[A-Z]/, "Debe contener al menos una letra MAYÚSCULA")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[\W_]/, "Debe contener al menos un carácter especial (ej: !@#$%)")
});