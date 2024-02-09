import { Exercise } from "../database/entities/Exercise";
import { AppDataSource } from '../database/data-source';
import { ExerciseDTO } from "../database/dto/ExerciseDTO";
import { User } from "../database/entities/User";


export class ExerciseService {
    private exerciseRepository = AppDataSource.getRepository(Exercise);
    private userRepository = AppDataSource.getRepository(User);

    async createExercise(exerciseData: ExerciseDTO): Promise<Exercise> {
        const user = await this.userRepository.findOne({ where: { id: exerciseData.user } });

        const newExercise = new Exercise();
        newExercise.name = exerciseData.name;
        newExercise.series = exerciseData.series;
        newExercise.repetitions = exerciseData.repetitions;
        newExercise.calories = exerciseData.calories;
        newExercise.user = user;

        return await this.exerciseRepository.save(newExercise);

    }

    async getAllExercises(): Promise<Exercise[]> {
        return await this.exerciseRepository.find();
    }

    async getExerciseById(exerciseId: string): Promise<Exercise | null> {
        return await this.exerciseRepository.findOne({ where: { id: exerciseId } })
    }

    async updateExercise(exerciseId: string, exerciseData: Partial<Exercise>): Promise<Exercise | null> {
        let exercise = await this.exerciseRepository.findOne({ where: { id: exerciseId } });
        if (exercise) {
            exercise = this.exerciseRepository.merge(exercise, exerciseData);
            return await this.exerciseRepository.save(exercise);
        }
        return null;
    }

    async deleteExercise(exerciseId: string): Promise<boolean> {
        const exercise = await this.exerciseRepository.findOne({ where: { id: exerciseId } });
        if (exercise) {
            await this.exerciseRepository.remove(exercise);
            return true;
        }
        return false;
    }
}