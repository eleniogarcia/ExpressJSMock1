const express = require('express');
const fs = require('fs');
const router = express.Router();

// Obtener todas las tareas
router.get('/', (req, res) => {
    const data = fs.readFileSync('./MOCK_DATA.json', 'utf-8');
    const tasks = JSON.parse(data);
    res.status(200).json(tasks);
});

// Obtener una tarea por ID
router.get('/:id', (req, res) => {
    const data = fs.readFileSync('./MOCK_DATA.json', 'utf-8');
    const tasks = JSON.parse(data);
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json(task);
});

// Crear una nueva tarea
router.post('/', (req, res) => {
    const data = fs.readFileSync('./MOCK_DATA.json', 'utf-8');
    const tasks = JSON.parse(data);
    
    const newTask = {
        id: req.body.id, // id unico
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        status: req.body.status,
        "geo-long": req.body["geo-long"],
        "geo-lat": req.body["geo-lat"]
    };

    tasks.push(newTask);
    fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(tasks, null, 2));
    res.status(201).json(newTask);
});

// Actualizar una tarea existente
router.put('/:id', (req, res) => {
    const data = fs.readFileSync('./MOCK_DATA.json', 'utf-8');
    const tasks = JSON.parse(data);
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    // Actualizar los datos de la tarea
    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: req.body.title || tasks[taskIndex].title,
        description: req.body.description || tasks[taskIndex].description,
        start: req.body.start || tasks[taskIndex].start,
        end: req.body.end || tasks[taskIndex].end,
        status: req.body.status || tasks[taskIndex].status,
        "geo-long": req.body["geo-long"] || tasks[taskIndex]["geo-long"],
        "geo-lat": req.body["geo-lat"] || tasks[taskIndex]["geo-lat"]
    };

    fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(tasks, null, 2));
    res.status(200).json(tasks[taskIndex]);
});

// Eliminar una tarea
router.delete('/:id', (req, res) => {
    const data = fs.readFileSync('./MOCK_DATA.json', 'utf-8');
    const tasks = JSON.parse(data);
    const newTasks = tasks.filter(t => t.id !== req.params.id);

    if (tasks.length === newTasks.length) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    fs.writeFileSync('./MOCK_DATA.json', JSON.stringify(newTasks, null, 2));
    res.status(200).json({ message: 'Tarea eliminada correctamente' });
});

// Exportar el router
module.exports = router;
