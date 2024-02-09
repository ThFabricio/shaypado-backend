import { Router } from 'express';
import { ExerciseMiddlewares } from '../middlewares/ExerciseMiddlewares';
import { createExercise, getAllExercises, getExerciseById, updateExercise, deleteExercise } from '../controllers/ExerciseController';

const router = Router();
const exerciseMiddlewares = new ExerciseMiddlewares();

router.post(
    '/',
    exerciseMiddlewares.validateCreateExercise,
    async (req, res, next) => {
        try {
            await createExercise(req.body, res);
        } catch (error) {
            next(error);
        }
    }
);
router.get('/', getAllExercises);
router.get('/:id', getExerciseById);
router.put('/:id', updateExercise);
router.delete('/:id', deleteExercise);

export default router;



