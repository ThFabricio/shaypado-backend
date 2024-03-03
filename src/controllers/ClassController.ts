import {Request, Response} from 'express';
import {ClassService} from '../services/ClassService';
import {ClassDTO} from '../database/dto/ClassDTO';
import {Class} from '../database/entities/Class';

const classService = new ClassService();

export const createClass = async (req: ClassDTO, res: Response) => {
    try {
        const class_ = await classService.createClass(req);
        res.status(201).json(class_);
    } catch (error) {
        res.status(500).json({error: 'Failed to create class'});
    }
}

export const getAllClasses = async (req: Request, res: Response) => {
    try {
        const classes = await classService.getAllClasses();
        res.json(classes);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch classes'});
    }
}

export const getClassById = async (req: Request, res: Response) => {
    const classId = req.params.id;
    try {
        const class_ = await classService.getClassById(classId);
        if (class_) {
            res.json(class_);
        } else {
            res.status(404).json({error: 'Class not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch class'});
    }
}

export const updateClass = async (req: Request, res: Response) => {
    const classId = req.params.id;
    try {
        const class_ = await classService.updateClass(classId, req.body);
        if (class_) {
            res.json(class_);
        } else {
            res.status(404).json({error: 'Class not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to update class'});
    }
}

export const deleteClass = async (req: Request, res: Response) => {
    const classId = req.params.id;
    try {
        const result = await classService.deleteClass(classId);
        if (result) {
            res.json({message: 'Class deleted successfully'});
        } else {
            res.status(404).json({error: 'Class not found'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to delete class'});
    }
}
