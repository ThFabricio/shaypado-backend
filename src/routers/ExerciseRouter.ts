import { Router } from 'express';
import { ExerciseMiddlewares } from '../middlewares/ExerciseMiddlewares';
import { createExercise, getAllExercises, getExerciseById, updateExercise, deleteExercise } from '../controllers/ExerciseController';
import { AuthenticationValidation } from '../middlewares/AuthenticationMiddleware';

const router = Router();
const exerciseMiddlewares = new ExerciseMiddlewares();
const authValidator = new AuthenticationValidation();

router.post(
    '/',
    authValidator.validateToken,
    exerciseMiddlewares.validateCreateExercise,
    async (req, res, next) => {
        try {
            await createExercise(req.body, res);
        } catch (error) {
            next(error);
        }
    }
);
router.get('/',
            authValidator.validateToken,
            async (req, res, next) => {
                try {
                    await getAllExercises(req, res);
                } catch (error) {
                    next(error);
                }
            }              
);
router.get('/:id', getExerciseById);
router.put('/:id', updateExercise);
router.delete('/:id', deleteExercise);
router.get('/user/:id', getAllExercises);

export default router;



