import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from 'uuid';

@Entity("student_profile")
export class StudentProfile {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: '' })
    fat_percentage: string;

    @Column({ default: '' })
    arm_circumference: string;

    @Column({ default: '' })
    waist_circumference: string;

    @Column({ default: '' })
    abdomen_circumference: string;

    @Column({ default: '' })
    hip_circumference: string;

    @Column({ default: '' })
    thigh_circumference: string;

    @Column({ default: '' })
    leg_circumference: string;

    @Column({ default: '' })
    height: string;

    @Column({ default: '' })
    weight: string;

    @Column()
    age: number;

    @Column({ default: '' })
    shoulder_circumference: string;

    constructor() {
        this.id = uuid();
        this.fat_percentage = "";
        this.arm_circumference = "";
        this.waist_circumference = "";
        this.abdomen_circumference = "";
        this.hip_circumference = "";
        this.thigh_circumference = "";
        this.leg_circumference = "";
        this.height = "";
        this.weight = "";
        this.age = 0; // Considerar um valor padrão ou ajustar conforme necessário
        this.shoulder_circumference = "";
    }
}
