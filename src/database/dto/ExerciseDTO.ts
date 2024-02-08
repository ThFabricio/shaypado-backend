export interface ExerciseDTO {
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
    workoutType: WorkoutTypeDTO[];
}

export interface WorkoutTypeDTO {
    type: string;
}

