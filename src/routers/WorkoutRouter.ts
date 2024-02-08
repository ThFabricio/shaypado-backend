import { Router } from 'express';
import { createWorkout, getAllWorkouts, getWorkoutById, updateWorkout, deleteWorkout} from '../controllers/WorkoutController';

const router = Router();

router.post(
    '/',
    async (req, res, next) => {
        try {
            await createWorkout(req, res);
        } catch (error) {
            next(error);
        }
    });
router.get('/', getAllWorkouts);
router.get('/:id', getWorkoutById);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

export default router;
