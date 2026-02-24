import authRoutes from './routers/auth.routes.js';
import dotenv from 'dotenv';
dotenv.config();//Cargar las variables de entorno
// Se importa la librería 'express' que permite crear el servidor web
import express from 'express';
import i18next from './config/i18n.config.js'; // Tu archivo de arriba
import middleware from 'i18next-http-middleware';
import helmet from 'helmet'; // Seguridad
import cors from 'cors'; // Conectividad
import rateLimit from 'express-rate-limit';
//import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import { connectDB } from './db.js'; //Base de Datos
// Se crea una instancia de express. 
// 'app' ahora contiene todos los métodos para configurar el servidor
const app = express();
// Ejecutar la conexión a la base de datos

connectDB();


//Middlewares de seguridad, datos y comunicacion con front
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));// Límite de 10kb para evitar saturación
app.use(express.urlencoded({ extended: true }));
app.use(middleware.handle(i18next));
// RATE LIMITING: Evita ataques de fuerza bruta
// Si una misma IP hace más de 100 peticiones en 10 min, se bloquea.
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 100,
  message: '⛔ Demasiadas peticiones desde esta IP, intenta de nuevo en 10 minutos.'
});

// MONGO SANITIZE: Previene inyección NoSQL (Borra signos $ y puntos)
//app.use(mongoSanitize());

app.use('/api', limiter, authRoutes);
// HPP: Previene contaminación de parámetros (ej: ?sort=a&sort=b)
app.use(hpp());

// Se define el puerto donde se aloja el servidor.
const PORT = process.env.PORT || 3000;
// Se define la ruta,'req' (request) -->usuario, 'res' (response) --> respuesta.
app.get ('/', (req, res) => {
    res.send('Servidor funcionado'); //Se envia texto para validar que el servidor este funcionando 
});

//Se  enciende el servidor
app.listen(PORT, () =>{
    console .log(`Servidor corriendo en modo SEGURO en puerto ${PORT}`);
});