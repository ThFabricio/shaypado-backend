import { Router } from 'express';
import {    createWorkout, 
            getAllWorkouts, 
            getWorkoutById, 
            updateWorkout, 
            deleteWorkout,
            createMultiplesWorkouts,
            listAllWorkoutTypes   } from '../controllers/WorkoutController';
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
//router.get('/:id', getWorkoutById);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

router.post(
    '/multiple-create-workouts',
    async (req, res, next) => {
        try {
            await createMultiplesWorkouts(req, res);
        } catch (error) {
            next(error);
        }
    }
)

router.get('/workout-types', 
    async (req, res, next) => {
        try {
            await listAllWorkoutTypes(req, res);
        } catch (error) {
            next(error);
        }
    }
)

export default router;
