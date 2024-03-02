import { Router } from 'express';
import { createStudentProfile, getAllStudentProfiles, getStudentProfileById, updateStudentProfile, deleteStudentProfile} from '../controllers/StudentProfileController';
import { StudentProfileMiddlewares } from '../middlewares/StudentProfileMiddlewares';

const router = Router();
const studentProfileMiddlewares = new StudentProfileMiddlewares();

router.post(
    '/',
    studentProfileMiddlewares.validateCreateStudentProfile,
    async (req, res, next) => {
        try {
            await createStudentProfile(req.body, res);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/', getAllStudentProfiles);
router.get('/:id', getStudentProfileById);
router.put('/:id', updateStudentProfile);
router.delete('/:id', deleteStudentProfile);

export default router;