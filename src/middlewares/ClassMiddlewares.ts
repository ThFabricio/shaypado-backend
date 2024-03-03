import { RequestHandler } from 'express';
import { ClassDTO } from '../database/dto/ClassDTO';
import Joi from 'joi';

export class ClassMiddlewares {

    public validateCreateClass: RequestHandler = async (req, res, next) => {
        let class_ = <ClassDTO> req.body;
        req.body = class_;      

        const schema = Joi.object({
            name: Joi.string().trim().required(),
            days_of_week: Joi.array().items(Joi.boolean()).max(8).required(),
            start_time: Joi.string().pattern(new RegExp('^[0-2]?[0-9]:[0-5][0-9]$')).required(),
            end_time: Joi.string().pattern(new RegExp('^[0-2]?[0-9]:[0-5][0-9]$')).required(),
            friends_code: Joi.array().items(Joi.string().trim()).optional(),
            workouts: Joi.array().items(Joi.string().trim()).optional(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        next(); 

    }

    public validateUpdateClass: RequestHandler = async (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().trim().optional(),
            days_of_week: Joi.array().items(Joi.string().trim()).optional(),
            start_time: Joi.string().pattern(new RegExp('^[0-2]?[0-9]:[0-5][0-9]$')).optional(),
            end_time: Joi.string().pattern(new RegExp('^[0-2]?[0-9]:[0-5][0-9]$')).optional(),
            user: Joi.string().trim().optional(),
            workouts: Joi.array().items(Joi.string().trim()).optional(),
        }).min(1); 

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        req.body = value;
        next();
    }

}