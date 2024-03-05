import { RequestHandler } from 'express';
import { ExerciseCreateRequestDTO } from '../database/dto/ExerciseDTO';
import Joi from 'joi';

export class ExerciseMiddlewares {
    public validateCreateExercise: RequestHandler = async (req, res, next) => {
        let exercise = <ExerciseCreateRequestDTO> req.body;
        req.body.user_id = req.headers.userId;
        req.body = exercise;

        const schema = Joi.object({
            title: Joi.string().trim().required(),
            description: Joi.string().trim().required(),
            video_url: Joi.string().trim().required(),
            series: Joi.number().integer().min(1).required(),
            repetitions: Joi.number().integer().min(1).required(),
            time: Joi.string().trim().required(),
            end_exercise: Joi.boolean().required(),
            user_id: Joi.string().trim().required(),
            workoutType: Joi.array().items(Joi.string().trim()).required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        next();
    }

    //flag admin
    //user e no user type eu vou passar admin 
    //o admin já consegue cadastrar um treino
    // se o treino fro cadastrado por um admin 
    //esse treino é pré pronto 
    //listar esse treino pré pronto 
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