import { Request, Response } from 'express';
import { TrainerProfileService } from '../services/TrainerProfileService';
import { TrainerProfileDTO } from '../database/dto/TrainerProfileDTO';
import { TrainerProfile } from '../database/entities/TrainerProfile';
import multer from 'multer';

const trainerProfileService = new TrainerProfileService();
const upload = multer({ dest: 'uploads/' });


export const createTrainerProfile = async (req: Request, res: Response) => {
    try {
        const trainerProfileData: TrainerProfileDTO = req.body;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (files && files.profilePicture && files.profilePicture[0]) {
            trainerProfileData.profilePicture = files.profilePicture[0].path; 
        }
        if (files && files.plansDocument && files.plansDocument[0]) {
            trainerProfileData.plansDocument = files.plansDocument[0].path; 
        }

        const trainerProfile = await trainerProfileService.createTrainerProfile(trainerProfileData);
        
        res.status(201).json(trainerProfile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create trainer profile' });
    }
};


export const getAllTrainerProfiles = async (req: Request, res: Response) => {
    try {
        const trainerProfiles = await trainerProfileService.getAllTrainerProfiles();
        res.json(trainerProfiles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch trainer profiles' });
    }
}

export const getTrainerProfileById = async (req: Request, res: Response) => {
    const profileId = req.params.id;
    try {
        const trainerProfile = await trainerProfileService.getTrainerProfileById(profileId);
        if (trainerProfile) {
            res.json(trainerProfile);
        } else {
            res.status(404).json({ error: 'Trainer profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch trainer profile' });
    }
}

export const updateTrainerProfile = async (req: Request, res: Response) => {
    const profileId = req.params.id;
    try {
        const trainerProfileData = req.body;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (files) {
            if (files.profilePicture && files.profilePicture[0]) {
                trainerProfileData.profilePicture = files.profilePicture[0].path;
            }
            if (files.plansDocument && files.plansDocument[0]) {
                trainerProfileData.plansDocument = files.plansDocument[0].path; 
            }
        }

        const updatedTrainerProfile = await trainerProfileService.updateTrainerProfile(profileId, trainerProfileData);

        if (updatedTrainerProfile) {
            res.json(updatedTrainerProfile);
        } else {
            res.status(404).json({ error: 'Trainer profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update trainer profile' });
    }
}

export const deleteTrainerProfile = async (req: Request, res: Response) => {
    const profileId = req.params.id;
    try {
        const result = await trainerProfileService.deleteTrainerProfile(profileId);
        if (result) {
            res.json({ message: 'Trainer profile deleted' });
        } else {
            res.status(404).json({ error: 'Trainer profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete trainer profile' });
    }
}

