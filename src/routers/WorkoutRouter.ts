import { Router } from 'express';
import {    createWorkout, 
            getAllWorkouts, 
            getWorkoutById, 
            updateWorkout, 
            deleteWorkout,
            createMultiplesWorkouts   } from '../controllers/WorkoutController';
import { WorkoutMiddlewares } from '../middlewares/WorkoutMiddlewares';

const router = Router();
const workoutMiddlewares = new WorkoutMiddlewares();

router.post(
    '/', 
    workoutMiddlewares.validateCreateWorkout,
    async (req, res, next) => {
        try {
            await createWorkout(req.body, res);
        } catch (error) {
            next(error);
        }
    });
router.get('/', getAllWorkouts);
router.get('/:id', getWorkoutById);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

router.post(
    '/multiple-create-workouts',
    async (req, res, next) => {
        try {
            console.log(req.body);
            console.log('entrou aqui');
            await createMultiplesWorkouts(req, res);
        } catch (error) {
            next(error);
        }
    }
)

export default router;
