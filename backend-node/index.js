// Se importa la librería 'express' que permite crear el servidor web
const express = require('express');
// Se crea una instancia de express. 
// 'app' ahora contiene todos los métodos para configurar el servidor
const app = express();
// Se define el puerto donde se aloja el servidor.
const PORT = 3000;
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