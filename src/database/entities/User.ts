import "reflect-metadata"
import { Column, CreateDateColumn, PrimaryColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    userType: string;

    @Column()
    weigth: string;

    @Column()
    height: string;

    @Column()
    workoutDays: string;

    @Column()
    any_disease: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    deleted_at: Date;

    constructor() {
        this.id = uuid();
        this.name = '';
        this.email = '';
        this.password = '';
        this.userType = '';
        this.weigth = '';
        this.height = '';
        this.workoutDays = '';
        this.any_disease = ''; // Defina o valor padrão ou deixe vazio, dependendo do requisito
        this.created_at = new Date();
        this.updated_at = new Date();
        this.deleted_at = new Date();
    }
};
