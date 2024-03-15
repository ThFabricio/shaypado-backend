import { RequestHandler } from 'express';
import { TrainerProfileDTO } from '../database/dto/TrainerProfileDTO';
import Joi from 'joi';

export class TrainerProfileMiddelwares {
    public validateCreateTrainerProfile: RequestHandler = async (req, res, next) => {
        let trainerProfile = <TrainerProfileDTO> req.body;
        req.body = trainerProfile;
        req.body.user_id = req.headers.userId;

        const schema = Joi.object({
            full_name: Joi.string().trim().required(),
            contact_email: Joi.string().trim().required(),
            contact_phone: Joi.string().trim().required(),
            specialties: Joi.string().trim().required(),
            age: Joi.number().min(0).required(),
            state: Joi.string().trim().required(),
            city: Joi.string().trim().required(),
            work_location: Joi.string().trim().required(),
            user_id: Joi.string().trim().required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
        
    }

    public validateUpdateTrainerProfile: RequestHandler = async (req, res, next) => {
        const schema = Joi.object({
            full_name: Joi.string().trim().optional(),
            contact_email: Joi.string().trim().optional(),
            contact_phone: Joi.string().trim().optional(),
            specialties: Joi.string().trim().optional(),
            age: Joi.number().min(0).optional(),
            state: Joi.string().trim().optional(),
            city: Joi.string().trim().optional(),
            work_location: Joi.string().trim().optional(),
            user_id: Joi.string().trim().optional(),
        }).min(1);

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    }
}