import { Router } from 'express';
import { createTrainerProfile, getAllTrainerProfiles, getTrainerProfileById, updateTrainerProfile, deleteTrainerProfile} from '../controllers/TrainerProfileController';
import { TrainerProfileMiddelwares } from '../middlewares/TrainerProfileMiddelwares';

const router = Router();
const trainerProfileMiddelwares = new TrainerProfileMiddelwares();

router.post(
    '/',
    trainerProfileMiddelwares.validateCreateTrainerProfile,
    async (req, res, next) => {
        try {
            await createTrainerProfile(req.body, res);
        } catch (error) {
            next(error);
        }
    }
);
router.get('/', getAllTrainerProfiles);
router.get('/:id', getTrainerProfileById);
router.put('/:id', updateTrainerProfile);
router.delete('/:id', deleteTrainerProfile);

export default router;