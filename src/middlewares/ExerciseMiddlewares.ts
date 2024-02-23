import { RequestHandler } from 'express';
import { ExerciseCreateRequestDTO } from '../database/dto/ExerciseDTO';
import Joi from 'joi';

export class ExerciseMiddlewares {
    public validateCreateExercise: RequestHandler = async (req, res, next) => {
        let exercise = <ExerciseCreateRequestDTO> req.body;
        req.body.userId = req.headers.userId;
        req.body = exercise;

        const schema = Joi.object({
            name: Joi.string().trim().required(),
            series: Joi.number().integer().min(1).required(),
            repetitions: Joi.number().integer().min(1).required(),
            calories: Joi.number().min(0).required(),
            user_id: Joi.string().trim().required(),
            workout_type_id: Joi.array().items(Joi.string().trim()).required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        next();
    }

    public validateUpdateExercise: RequestHandler = async (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().trim().optional(),
            series: Joi.number().integer().min(1).optional(),
            repetitions: Joi.number().integer().min(1).optional(),
            calories: Joi.number().min(0).optional(),
            user_id: Joi.string().trim().optional(),
            workout_type_id: Joi.string().trim().optional()
        }).min(1);


        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        next();
    }
}