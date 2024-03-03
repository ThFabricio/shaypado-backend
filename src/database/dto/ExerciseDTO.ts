import { WorkoutType } from "../entities/WorkouType";

export interface ExerciseCreateRequestDTO {
    title: string;
    description: string;
    video_url: string;
    series: number;
    repetitions: number;
    time: string;
    user: string;
    workoutType: string[];
}

export interface ExerciseResponseDTO {
    title: string;
    description: string;
    video_url: string;
    series: number;
    repetitions: number;
    time: string;
    workoutType?: WorkoutType[];
}

export interface WorkoutTypeDTO {
    type: string;
}

