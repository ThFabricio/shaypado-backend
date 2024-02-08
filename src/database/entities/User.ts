import "reflect-metadata"
import { Column, CreateDateColumn, PrimaryColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name?: string;

    @Column()
    email?: string;

    @Column()
    password?: string;

    @Column()
    userType?: string;

    @Column()
    weigth?: string;

    @Column()
    height?: string;

    @Column()
    workoutDays?: string;

    @Column()
    any_disease?: string;

    constructor() {
        this.id = uuid();
    }
};
