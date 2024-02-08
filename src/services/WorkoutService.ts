import { Workout } from "../database/entities/Workout";
import { AppDataSource } from '../database/data-source';
import { WorkoutType } from "../database/entities/WorkouType";
import { WorkoutDTO } from "../database/dto/WorkoutDTO";
import { User } from "../database/entities/User";


export class WorkoutService {
    private workoutRepository = AppDataSource.getRepository(Workout);
    private workoutTypeRepository = AppDataSource.getRepository(WorkoutType);
    private userRepository = AppDataSource.getRepository(User);

    async createWorkout(workoutData: WorkoutDTO): Promise<Workout> {
        const workoutType = await this.workoutTypeRepository.findOne({ where: { id: workoutData.workoutType } });
        const user = await this.userRepository.findOne({ where: { id: workoutData.user } });

        const newWorkout = new Workout();
        newWorkout.name = workoutData.name ?? '';
        newWorkout.start_hour = workoutData.start_hour ?? '';
        newWorkout.end_hour = workoutData.end_hour ?? '';
        newWorkout.day = workoutData.day ?? '';
        newWorkout.workoutType = workoutType;
        newWorkout.user = user;

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
