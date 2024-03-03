import { Router } from 'express';
import {    createTrainerProfile, 
            getAllTrainerProfiles, 
            getTrainerProfileById, 
            updateTrainerProfile, 
            deleteTrainerProfile, 
            uploadPicure, 
            uploadDoc, 
            associateProfilePicture,
            associatePlansDocument,
            associateStudentProfile } from '../controllers/TrainerProfileController';
import { createStudentProfile } from '../controllers/StudentProfileController';
import { TrainerProfileMiddelwares } from '../middlewares/TrainerProfileMiddelwares';
import { uploadImage, uploadDocument } from  '../shared/Multer';
import { createFriendshipAssociation } from '../controllers/UserController';

const router = Router();
const trainerProfileMiddelwares = new TrainerProfileMiddelwares();


router.post(
    '/',
    //trainerProfileMiddelwares.validateCreateTrainerProfile,
    async (req, res, next) => {
        try {
            await createTrainerProfile(req, res);
        } catch (error) {
            next(error);
        }
    }
);
router.get('/', getAllTrainerProfiles);
router.get('/:id', getTrainerProfileById);
router.put('/:id', updateTrainerProfile);
router.delete('/:id', deleteTrainerProfile);

router.post(
    '/upload_picture',
    uploadImage.single('profilePicture'),
    async (req, res, next) => {
        try {
            await uploadPicure(req, res);
        } catch (error) {
            next(error);
        }
    }
)

router.post(
    '/upload_document',
    uploadDocument.single('plansDocument'),
    async (req, res, next) => {
        try {
            await uploadDoc(req, res);
        } catch (error) {
            next(error);
        }
    }
)

router.post(
    '/associate_picture',
    async (req, res, next) => {
        try {
            console.log("Rota de associação de imagem");
            console.log(req.body);
            await associateProfilePicture(req, res);
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    '/associate_document',
    async (req, res, next) => {
        try {
            console.log("Rota de associação de documento");
            console.log(req.body);
            await associatePlansDocument(req, res);
        } catch (error) {
            next(error);
        }
    }
);

/*router.post(
    '/create-student-profile',
    async (req, res, next) => {
        try {
            const student = await createStudentProfile(req, res);
            req.body = student;
            console.log("Rota de associação de perfil de estudante");
            console.log(req.body);
            await associateStudentProfile(req, res);
        } catch (error) {
            next(error);
        }
    }
)*/

export default router;