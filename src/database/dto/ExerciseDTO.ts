import { WorkoutType } from "../entities/WorkouType";

export interface ExerciseCreateRequestDTO {
    name: string;
    series: number;
    repetitions: number;
    calories: number;
    user: string;
    workoutType: string[];
}

export interface ExerciseResponseDTO {
    name: string;
    series: number;
    repetitions: number;
    calories: number;
    workoutType?: WorkoutType[];
}

export interface WorkoutTypeDTO {
    type: string;
}

