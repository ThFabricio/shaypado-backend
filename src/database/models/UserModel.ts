
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    userType: string;
    weigth?: string;
    height?: string;
    workoutDays?: string;
    any_disease?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
};