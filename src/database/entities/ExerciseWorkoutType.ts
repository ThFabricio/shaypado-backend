import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WorkoutType } from "./WorkouType";
import { Exercise } from "./Exercise";
import { v4 as uuid } from 'uuid';


@Entity ('exercise_workout_type')
export class ExerciseWorkoutType {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => WorkoutType, workoutType => workoutType.id)
    workoutType: WorkoutType | null;

    @ManyToOne(() => Exercise, exercise => exercise.id)
    exercise: Exercise | null;

    constructor() {
        this.id = uuid();
        this.workoutType = null;
        this.exercise = null;
    }
};


