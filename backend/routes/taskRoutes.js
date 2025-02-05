import express from 'express';
import {Task} from '../models/taskModel.js';

const router = express.Router();

//Create a new task
router.post('/', async (req,res)=>{
    try {
        if(!req.body.title || !req.body.category) {
            return res.status(400).send('Title is required!')
        }
        const newTask = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            category: req.body.category,
            priority: req.body.priority
        }
        const task = await Task.create(newTask);
        return res.status(200).send(task)
    }
    catch(error) {
        console.log(error.message);
        return res.status(500).send(`Error: ${error.message}`)
    }
})

//Get all tasks
router.get('/', async(req,res)=>{
    try {
        const tasks = await Task.find({});
        return res.status(200).json({
            count: tasks.length,
            data: tasks
        })
    }
    catch(error) {
        console.log(error.message);
        return res.status(500).send(`Error: ${error.message}`)
    }
})

//Get a single task by id
router.get('/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        return res.status(200).json({task});
    }
    catch(error) {
        console.log(error.message);
        return res.status(500).send(`Error: ${error.message}`)
    }
})

//Update a task
router.put('/:id', async(req,res)=> {
    try {
        // if (!req.body.title || !req.body.description || !req.body.category) {
        //     return res.status(400).send('Send all the required details');
        // }

        const {id} = req.params;
        const result = await Task.findByIdAndUpdate(id,req.body);

        if(!result) {
            return res.status(404).send('Task not found');
        }
        return res.status(200).send('Task successfully updated');
    }
    catch(error) {
        console.log(error.message);
        return res.status(500).send(`Error: ${error.message}`)
    }
})

//Delete a task
router.delete('/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await Task.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({message: 'Task not found'});
        }

        return res.status(200).send('Task successfully deleted');
    }
    catch(error) {
        console.log(error.message);
        return res.status(500).send(`Error: ${error.message}`)
    }
})

export default router;