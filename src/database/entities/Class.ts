import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Workout } from "./Workout";
import { User } from './User';

@Entity('class')
export class Class {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('boolean', {array: true})
    days_of_week: boolean[];

    @Column()
    start_time: string;

    @Column()
    end_time: string;

    @Column("varchar", { array: true })
    friends_code: string[];

    @ManyToMany( () => Workout )
    @JoinTable({name: 'class_workout'})
    workouts?: Workout[];

    constructor() {
        this.id = uuid();
        this.name = '';
        this.days_of_week = [];
        this.start_time = '';
        this.end_time = '';
        this.friends_code = [];
    }
}