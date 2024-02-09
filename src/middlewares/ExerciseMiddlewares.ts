import { RequestHandler } from 'express';
import { ExerciseDTO } from '../database/dto/ExerciseDTO';

export class ExerciseMiddlewares {
    public validateCreateExercise: RequestHandler = async (req, res, next) => {
        let exercise = <ExerciseDTO> req.body;
        req.body = exercise;
        next();
        
    }
}