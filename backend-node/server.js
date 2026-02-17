require('dotenv').config(); //Cargar las variables de entorno
// Se importa la librería 'express' que permite crear el servidor web
const express = require('express');
const helmet = require('helmet'); //Se importa libreria de seguridad 
const cors = require('cors'); //conectividad
// Se crea una instancia de express. 
// 'app' ahora contiene todos los métodos para configurar el servidor
const app = express();
//Middlewares de seguridad, datos y comunicacion con front
app.use(helmet());
app.use(cors());
app.use(express.json());
// Se define el puerto donde se aloja el servidor.
const PORT = process.env.PORT || 3000;
// Se define la ruta,'req' (request) -->usuario, 'res' (response) --> respuesta.
app.get ('/', (req, res) => {
    res.send('Servidor funcionado'); //Se envia texto para validar que el servidor este funcionando 
});
//Ruta secundaria para probar navegacion 
app.get('/estado', (req, res) => {
    res.json({
        status: 'online',
        mensaje: 'Trabajo en proceso',
        version: '1.0.0'
    });
});
//Se  enciende el servidor
app.listen(PORT, () =>{
    console .log(`Servidor en linea en http://localhost:${PORT}`);
});