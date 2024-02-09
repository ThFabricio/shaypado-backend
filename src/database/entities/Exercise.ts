import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from 'uuid';
import { WorkoutType } from "./WorkouType";
import Joi from "joi";

@Entity('exercise')
export class Exercise {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    series: number;

    @Column()
    repetitions: number;

    @Column()
    calories: number;

    @ManyToOne(() => User, user => user.id)
    user: User | null;

    @ManyToMany( () => WorkoutType, 
                { cascade: true, onDelete: 'CASCADE' })
    @JoinTable({name: 'exercise_workout_type'})
    workoutTypes?: WorkoutType[];

    constructor() {
        this.id = uuid();
        this.name = '';
        this.series = 0;
        this.repetitions = 0;
        this.calories = 0;
        this.user = null;
    }
};



