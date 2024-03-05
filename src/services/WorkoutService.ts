import { Workout } from "../database/entities/Workout";
import { AppDataSource } from '../database/data-source';
import { WorkoutType } from "../database/entities/WorkouType";
import { WorkoutDTO } from "../database/dto/WorkoutDTO";
import { User } from "../database/entities/User";
import { Exercise } from "../database/entities/Exercise";


export class WorkoutService {
    private workoutRepository = AppDataSource.getRepository(Workout);
    private workoutTypeRepository = AppDataSource.getRepository(WorkoutType);
    private userRepository = AppDataSource.getRepository(User);
    private exerciseRepository = AppDataSource.getRepository(Exercise);

    async createWorkout(workoutData: WorkoutDTO): Promise<Workout> {
        const workoutType = await this.workoutTypeRepository.findOne({ where: { id: workoutData.workoutType } });
        const user = await this.userRepository.findOne({ where: { id: workoutData.user } });

        const newWorkout = new Workout();
        newWorkout.title = workoutData.title ?? '';
        newWorkout.endWorkout = workoutData.endWorkout ?? false;
        newWorkout.workoutType = workoutType;
        newWorkout.user = user;

        if(workoutData.exercises) {
            const exercises = await this.exerciseRepository.findByIds(workoutData.exercises);
            newWorkout.exercises = exercises;
        };

        return await this.workoutRepository.save(newWorkout);
    }

    async getAllWorkouts(): Promise<Workout[]> {
        return await this.workoutRepository.find();
    }

    async getWorkoutById(workoutId: string): Promise<Workout | null> {
        return await this.workoutRepository.findOne({ where: { id: workoutId } })
    }

    async updateWorkout(workoutId: string, workoutData: Partial<Workout>): Promise<Workout | null> {
        let workout = await this.workoutRepository.findOne({ where: { id: workoutId } });
        if (workout) {
            workout = this.workoutRepository.merge(workout, workoutData);
            return await this.workoutRepository.save(workout);
        }
        return null;
    }

    async deleteWorkout(workoutId: string): Promise<boolean> {
        const workout = await this.workoutRepository.findOne({ where: { id: workoutId } });
        if (workout) {
            await this.workoutRepository.remove(workout);
            return true;
        }
        return false;
    }

    async createMultiplesWorkouts(workoutsData: WorkoutDTO[]): Promise<Workout[]> {
        const workouts: Workout[] = [];
        for (const workoutData of workoutsData) {
            const workoutType = await this.workoutTypeRepository.findOne({ where: { id: workoutData.workoutType } });
            const user = await this.userRepository.findOne({ where: { id: workoutData.user } });

            const newWorkout = new Workout();
            newWorkout.title = workoutData.title ?? '';
            newWorkout.endWorkout = workoutData.endWorkout ?? false;
            newWorkout.workoutType = workoutType;
            newWorkout.user = user;

            if(workoutData.exercises) {
                const exercises = await this.exerciseRepository.findByIds(workoutData.exercises);
                newWorkout.exercises = exercises;
            };

            workouts.push(newWorkout);
        }
        return await this.workoutRepository.save(workouts);
    }

    async getTrainingPrePreparede(): Promise<Workout[]> {
        console.log('entrou');
        const workouts = await this.workoutRepository.find({relations: ['users'] });
        const trainer_admin = workouts.filter(workout => workout.user?.userType === 'admin');

        return trainer_admin;
        
    }
}
