import { WorkoutType } from "../entities/WorkouType";

export interface ExerciseCreateRequestDTO {
    title: string;
    description: string;
    video_url: string;
    series: number;
    repetitions: number;
    time: string;
    end_exercise: boolean;
    user: string;
    workoutType: string[];
}

export interface ExerciseResponseDTO {
    id: string;
    title: string;
    description: string;
    video_url: string;
    series: number;
    repetitions: number;
    time: string;
    end_exercise: boolean;
    workoutType?: WorkoutType[];
}

export interface WorkoutTypeDTO {
    type: string;
}

