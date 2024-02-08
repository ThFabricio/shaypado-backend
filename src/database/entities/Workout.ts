import { Column, CreateDateColumn, PrimaryColumn, Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { WorkoutType } from './WorkouType';

@Entity('workout')
export class Workout {
    
        @PrimaryGeneratedColumn('uuid')
        id: string;
    
        @Column()
        name: string;
    
        @Column()
        start_hour: string;
    
        @Column()
        end_hour: string;
    
        @Column()
        day: string;

        @ManyToOne(() => WorkoutType, workoutType => workoutType.id)
        workoutType: WorkoutType | null;

        constructor() {
            this.id = uuid();
            this.name = '';
            this.start_hour = '';
            this.end_hour = '';
            this.day = '';
            this.workoutType = null;
        }
    }