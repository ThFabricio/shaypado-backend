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
            createStudentProfile,
            trainerProfileById } from '../controllers/TrainerProfileController';
import { uploadImage, uploadDocument } from  '../shared/Multer';
import { AuthenticationValidation } from '../middlewares/AuthenticationMiddleware';

const router = Router();
const authValidator = new AuthenticationValidation();

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
router.get('/list-all-trainer', getAllTrainerProfiles);
router.get('/trainerProfiler',
            trainerProfileById);

router.get('/', 
            authValidator.validateToken,
            async (req, res, next) => {
                try {
                    await trainerProfileById(req, res);
                } catch (error) {
                    next(error);
                }
            }
);
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

router.post(
    '/create-student-profile',
    async (req, res, next) => {
        try {
            await createStudentProfile(req, res);
        } catch (error) {
            next(error);
        }
    }
)

export default router;