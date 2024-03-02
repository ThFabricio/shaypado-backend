import { RequestHandler } from 'express';
import { TrainerProfileDTO } from '../database/dto/TrainerProfileDTO';

export class TrainerProfileMiddelwares {
    public validateCreateTrainerProfile: RequestHandler = async (req, res, next) => {
        let trainerProfile = <TrainerProfileDTO> req.body;
        req.body = trainerProfile;
        next();
        
    }
}