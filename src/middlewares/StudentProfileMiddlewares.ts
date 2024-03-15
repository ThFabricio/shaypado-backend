import { RequestHandler } from 'express';
import { StudentProfileDTO } from '../database/dto/StudentProfileDTO';
import Joi from 'joi';


export class StudentProfileMiddlewares {
    public validateCreateStudentProfile: RequestHandler = async (req, res, next) => {
        let studentProfile = <StudentProfileDTO> req.body;
        req.body = studentProfile;
        req.body.user_id = req.headers.userId;

        const schema = Joi.object({
            gender: Joi.string().trim().required(),
            fat_percentage: Joi.string().trim().required(),
            arm_circumference: Joi.string().trim().required(),
            waist_circumference: Joi.string().trim().required(),
            abdomen_circumference: Joi.string().trim().required(),
            hip_circumference: Joi.string().trim().required(),
            thigh_circumference: Joi.string().trim().required(),
            leg_circumference: Joi.string().trim().required(),
            height: Joi.string().trim().required(),
            weight: Joi.string().trim().required(),
            age: Joi.number().min(0).required(),
            shoulder_circumference: Joi.string().trim().required(),
            user_id: Joi.string().trim().required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        next();
        
    }

    public validateUpdateStudentProfile: RequestHandler = async (req, res, next) => {
        const schema = Joi.object({
            gender: Joi.string().trim().optional(),
            at_percentage: Joi.string().trim().optional(),
            arm_circumference: Joi.string().trim().optional(),
            waist_circumference: Joi.string().trim().optional(),
            abdomen_circumference: Joi.string().trim().optional(),
            hip_circumference: Joi.string().trim().optional(),
            thigh_circumference: Joi.string().trim().optional(),
            leg_circumference: Joi.string().trim().optional(),
            height: Joi.string().trim().optional(),
            weight: Joi.string().trim().optional(),
            age: Joi.number().min(0).optional(),
            shoulder_circumference: Joi.string().trim().optional(),
            user_id: Joi.string().trim().optional(),
        }).min(1);

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        next();
    }
}
