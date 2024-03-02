import { RequestHandler } from 'express';
import { StudentProfileDTO } from '../database/dto/StudentProfileDTO';

export class StudentProfileMiddlewares {
    public validateCreateStudentProfile: RequestHandler = async (req, res, next) => {
        let studentProfile = <StudentProfileDTO> req.body;
        req.body = studentProfile;
        next();
        
    }
}
