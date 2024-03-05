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
    title: string;

    @Column()
    description: string;

    @Column()
    video_url: string;

    @Column()
    series: number;

    @Column()
    repetitions: number;

    @Column()
    time: string;

    @Column()
    end_exercise: boolean;

    @ManyToOne(() => User, user => user.id)
    user: User | null;

    @ManyToMany( () => WorkoutType )
    @JoinTable({name: 'exercise_workout_type'})
    workoutTypes?: WorkoutType[];

    constructor() {
        this.id = uuid();
        this.title = '';
        this.description = '';
        this.video_url = '';
        this.series = 0;
        this.repetitions = 0;
        this.time = '';
        this.end_exercise = false;
        this.user = null;
    }
};



