import { RequestHandler } from 'express';
import { WorkoutDTO } from '../database/dto/WorkoutDTO';

export class WorkoutMiddlewares {
    public validateCreateWorkout: RequestHandler = async (req, res, next) => {
        let workout = <WorkoutDTO> req.body;
        req.body = workout;
        next();
        
    }
}
