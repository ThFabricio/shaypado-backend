import { Exercise } from "../database/entities/Exercise";
import { AppDataSource } from '../database/data-source';
import { ExerciseCreateRequestDTO, ExerciseResponseDTO } from "../database/dto/ExerciseDTO";
import { User } from "../database/entities/User";
import { WorkoutType } from "../database/entities/WorkouType";


export class ExerciseService {
    private exerciseRepository = AppDataSource.getRepository(Exercise);
    private userRepository = AppDataSource.getRepository(User);
    private workoutTypeRepository = AppDataSource.getRepository(WorkoutType);

    async createExercise(exerciseData: ExerciseCreateRequestDTO): Promise<ExerciseResponseDTO> {

        const user = await this.userRepository.findOne({ where: { id: exerciseData.user } });

        const newExercise = new Exercise();
        newExercise.title = exerciseData.title ?? '';
        newExercise.description = exerciseData.description ?? '';
        newExercise.video_url = exerciseData.video_url ?? '';
        newExercise.series = exerciseData.series ?? 0;
        newExercise.repetitions = exerciseData.repetitions ?? 0;
        newExercise.time = exerciseData.time ?? '';
        newExercise.user = user;

        if(exerciseData.workoutType) {
            const workoutTypes = await this.workoutTypeRepository.findByIds(exerciseData.workoutType);
            newExercise.workoutTypes = workoutTypes;
        };

        const exercise = await this.exerciseRepository.save(newExercise);
        return {
            title: exercise.title,
            description: exercise.description,
            video_url: exercise.video_url,
            series: exercise.series,
            repetitions: exercise.repetitions,
            time: exercise.time,
            workoutType: exercise.workoutTypes || []
        };
    }

    async getAllExercises(): Promise<Exercise[]> {
        return await this.exerciseRepository.find({ relations: ['workoutTypes'] });
    }

    async getExerciseById(exerciseId: string): Promise<ExerciseResponseDTO | null> {
        return await this.exerciseRepository.findOne({ where: { id: exerciseId }, relations: ['workoutTypes']})
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

    async getAllExercisesByUser(userId: string): Promise<ExerciseResponseDTO[]> {
        const exercises = await this.exerciseRepository.find({ where: { user: { id: userId } }, relations: ['workoutTypes'] });
        return exercises.map(exercise => {
            return {
                title: exercise.title,
                description: exercise.description,
                video_url: exercise.video_url,
                series: exercise.series,
                repetitions: exercise.repetitions,
                time: exercise.time,
                workoutType: exercise.workoutTypes || []
            }
        });
    }
}