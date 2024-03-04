import { User } from "../entities/User";

export interface StudentProfileDTO {
    id: string;
    gender: string;
    fat_percentage: string;
    arm_circumference: string;
    waist_circumference: string;
    abdomen_circumference: string;
    hip_circumference: string;
    thigh_circumference: string;
    leg_circumference: string;
    height: string;
    weight: string;
    age: number;
    shoulder_circumference: string;
    user: User;
}
