import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from 'uuid';

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

    constructor() {
        this.id = uuid();
        this.name = '';
        this.series = 0;
        this.repetitions = 0;
        this.calories = 0;
        this.user = null;
    }
};



