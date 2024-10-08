const express = require('express');
const bodyParser = require('body-parser'); // Para parsear el cuerpo de las solicitudes
const tasksRoutes = require('./routes/tasksRouter'); // Importar el módulo de rutas de tareas

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Usar las rutas de tareas en el prefijo /tasks
app.use('/tasks', tasksRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de gestión de tareas');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
