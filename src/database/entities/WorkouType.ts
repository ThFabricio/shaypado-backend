import { Column, CreateDateColumn, PrimaryColumn, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Workout } from './Workout';

@Entity('workout_type')
export class WorkoutType {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    type: string;

    constructor() {
        this.id = uuid();
        this.type = '';
    }
}; 

