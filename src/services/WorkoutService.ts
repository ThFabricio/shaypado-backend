import { Workout } from "../database/entities/Workout";
import { AppDataSource } from '../database/data-source';
import { WorkoutType } from "../database/entities/WorkouType";


export class WorkoutService {
    private workoutRepository = AppDataSource.getRepository(Workout);
    private workoutTypeRepository = AppDataSource.getRepository(WorkoutType);

    async createWorkout(workoutData: Partial<Workout>): Promise<Workout> {
        const workoutType = await this.workoutTypeRepository.findOne({ where: { id: workoutData.workoutType?.id } });

        const newWorkout = new Workout();
        newWorkout.name = workoutData.name ?? '';
        newWorkout.start_hour = workoutData.start_hour ?? '';
        newWorkout.end_hour = workoutData.end_hour ?? '';
        newWorkout.day = workoutData.day ?? '';
        newWorkout.workoutType = workoutType;

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
}
