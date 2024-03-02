import { Request, Response } from 'express';
import { StudentProfileService } from '../services/StudentProfileService';
import { StudentProfileDTO } from '../database/dto/StudentProfileDTO';
import { StudentProfile } from '../database/entities/StudentProfile';

const studentProfileService = new StudentProfileService();

export const createStudentProfile = async (req: StudentProfileDTO, res: Response) => {
    try {
        const studentProfile = await studentProfileService.createStudentProfile(req);
        res.status(201).json(studentProfile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create student profile' });
    }
}

export const getAllStudentProfiles = async (req: Request, res: Response) => {
    try {
        const studentProfiles = await studentProfileService.getAllStudentProfiles();
        res.json(studentProfiles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch student profiles' });
    }
}

export const getStudentProfileById = async (req: Request, res: Response) => {
    const profileId = req.params.id;
    try {
        const studentProfile = await studentProfileService.getStudentProfileById(profileId);
        if (studentProfile) {
            res.json(studentProfile);
        } else {
            res.status(404).json({ error: 'Student profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch student profile' });
    }
}

export const updateStudentProfile = async (req: Request, res: Response) => {
    const profileId = req.params.id;
    try {
        const studentProfile = await studentProfileService.updateStudentProfile(profileId, req.body);
        if (studentProfile) {
            res.json(studentProfile);
        } else {
            res.status(404).json({ error: 'Student profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update student profile' });
    }
}

export const deleteStudentProfile = async (req: Request, res: Response) => {
    const profileId = req.params.id;
    try {
        const result = await studentProfileService.deleteStudentProfile(profileId);
        if (result) {
            res.json({ message: 'Student profile deleted' });
        } else {
            res.status(404).json({ error: 'Student profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete student profile' });
    }
}

