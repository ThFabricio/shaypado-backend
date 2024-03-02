import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from 'uuid';


@Entity('friendships')
export class Friendship {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    init_day: Date;

    @ManyToOne(() => User)
    @JoinTable({name: 'user_id'})
    user: User | null;

    @ManyToOne(() => User)
    @JoinTable({name: 'user_id'})
    friend: User | null;


    constructor() {
        this.id = uuid();
        this.init_day = new Date();
        this.user = null;
        this.friend = null;
    }
}