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
    friendship_code?: string;

    constructor() {
        this.id = uuid();
    }
};
