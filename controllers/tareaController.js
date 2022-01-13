const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

//crea una nueva tarea
exports.crearTarea = async(req,res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        //verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){
            res.status(401).json({msg: 'No autorizado'});
        }
        //cear la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
//obtiene las tareas por proyecto
exports.obtenertareas = async (req,res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        //verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){
            res.status(401).json({msg: 'No autorizado'});
        }

        //obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto })
        res.json({tareas})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
//actualizar una tarea 
exports.actualizartarea = async (req,res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto, nombre, estado } = req.body;
        console.log(req)
        //si la tarea existe o no
        const tareaExiste = await Tarea.findById(req.params.id)
        if(!tareaExiste){
            res.status(401).json({msg: 'No existe esa tarea'});
        }
        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        //verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){
            res.status(401).json({msg: 'No autorizado'});
        }
        //crear objeto con la nueva informacion
        const nuevaTarea = {};
        if(nombre){
            nuevaTarea.nombre = nombre;
        }
        if(estado){
            nuevaTarea.estado = estado;
        }
        //Guardar la tarea
        const tarea = await Tarea.findOneAndUpdate({ _id : req.params.id }, nuevaTarea, { new : true });
        res.json({tarea})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
//elimina una tarea
exports.eliminartarea = async (req,res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;
        console.log(req)
        //si la tarea existe o no
        const tareaExiste = await Tarea.findById(req.params.id)
        if(!tareaExiste){
            res.status(401).json({msg: 'No existe esa tarea'});
        }
        //extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        //verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id){
            res.status(401).json({msg: 'No autorizado'});
        }
        //Eliminar la tarea
        await Tarea.findOneAndRemove({ _id : req.params.id });
        res.json({msg:'Tarea eliminada'})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}