import { Column, CreateDateColumn, PrimaryColumn, Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn, ManyToOne, JoinTable } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { WorkoutType } from './WorkouType';
import { User } from './User';
import { Exercise } from './Exercise';

@Entity('workout')
export class Workout {
    
        @PrimaryGeneratedColumn('uuid')
        id: string;
    
        @Column()
        title: string;

        @Column()
        endWorkout: boolean;

        @ManyToOne(() => WorkoutType, workoutType => workoutType.id)
        workoutType: WorkoutType | null;

        @ManyToOne(() => User, user => user.id)
        user: User | null;

        @ManyToMany( () => Exercise )
        @JoinTable({name: 'workout_exercise'})
        exercises?: Exercise[];

        constructor() {
            this.id = uuid();
            this.title = '';
            this.endWorkout = false;
            this.workoutType = null;
            this.user = null;
        }
    }