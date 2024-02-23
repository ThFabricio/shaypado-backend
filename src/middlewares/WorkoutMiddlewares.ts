import { RequestHandler } from 'express';
import { WorkoutDTO } from '../database/dto/WorkoutDTO';
import Joi from 'joi';

export class WorkoutMiddlewares {

    public validateCreateWorkout: RequestHandler = async (req, res, next) => {
        let workout = <WorkoutDTO> req.body;
        req.body = workout;      

        const schema = Joi.object({
            name: Joi.string().trim().required(),
            start_hour: Joi.string().pattern(new RegExp('^[0-2]?[0-9]:[0-5][0-9]$')).required(),
            end_hour: Joi.string().pattern(new RegExp('^[0-2]?[0-9]:[0-5][0-9]$')).required(),
            day: Joi.string().trim().required(),
            workout_type_id: Joi.string().trim().required(),
            user_id: Joi.string().trim().required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        next(); 

    }

    public validateUpdateWorkout: RequestHandler = async (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().trim().optional(),
            start_hour: Joi.string().pattern(new RegExp('^[0-2]?[0-9]:[0-5][0-9]$')).optional(),
            end_hour: Joi.string().pattern(new RegExp('^[0-2]?[0-9]:[0-5][0-9]$')).optional(),
            day: Joi.string().trim().optional(),
            workout_type_id: Joi.string().trim().optional(),
            user_id: Joi.string().trim().optional(),
        }).min(1); 

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        req.body = value;
        next();
    }

}
        
