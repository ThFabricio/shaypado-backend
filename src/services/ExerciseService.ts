import { Exercise } from "../database/entities/Exercise";
import { AppDataSource } from '../database/data-source';
import { ExerciseDTO, ExerciseResponseDTO, WorkoutTypeDTO } from "../database/dto/ExerciseDTO";
import { User } from "../database/entities/User";
import { WorkoutType } from "../database/entities/WorkouType";
import { ExerciseWorkoutType } from "../database/entities/ExerciseWorkoutType";


export class ExerciseService {
    private exerciseRepository = AppDataSource.getRepository(Exercise);
    private userRepository = AppDataSource.getRepository(User);
    private exerciseWorkoutTypeRepository = AppDataSource.getRepository(ExerciseWorkoutType);

    async createExercise(exerciseData: ExerciseDTO): Promise<ExerciseResponseDTO> {

        const user = await this.userRepository.findOne({ where: { id: exerciseData.user } });

        const newExercise = new Exercise();
        newExercise.name = exerciseData.name;
        newExercise.series = exerciseData.series;
        newExercise.repetitions = exerciseData.repetitions;
        newExercise.calories = exerciseData.calories;
        newExercise.user = user;

        const exercise = await this.exerciseRepository.save(newExercise);

        let workoutTypes: WorkoutTypeDTO[] = [];
        if (exerciseData.workoutType.length > 0) {
            const promises = exerciseData.workoutType.map(async (type) => {
                const workoutType = await AppDataSource.getRepository('workout_type').findOne({ where: { id: type } });
                if (workoutType) {
                    const exerciseWorkoutType = new ExerciseWorkoutType();
                    exerciseWorkoutType.exercise = exercise;
                    exerciseWorkoutType.workoutType = workoutType as WorkoutType;
                    await this.exerciseWorkoutTypeRepository.save(exerciseWorkoutType);
                    workoutTypes.push({ type: workoutType.type });
                }
            });
            await Promise.all(promises);
        }
        return { ...exercise, workoutType: workoutTypes };
    }

    async getAllExercises(): Promise<Exercise[]> {
        const teste = await this.exerciseWorkoutTypeRepository.find({ relations: ['exercise', 'workoutType'] });
        console.log(teste);
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