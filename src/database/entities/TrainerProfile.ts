import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from 'uuid';
import { ProfilePicture } from "./ProfilePicure";
import { PlansDocument } from "./PlansDocument";

@Entity("trainer_profile")
export class TrainerProfile {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    full_name: string;

    @Column()
    contact_email: string;

    @Column()
    contact_phone: string;

    @Column()
    specialties: string;

    @Column()
    age: number;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    work_location: string;

    @ManyToOne(() => ProfilePicture, profilePicture => profilePicture.id)
    @JoinColumn({ name: "profile_picture_id" })
    profilePicture: ProfilePicture | null;

    @ManyToOne(() => PlansDocument, plansDocument => plansDocument.id)
    @JoinColumn({ name: "plans_document_id" })
    plansDocument: PlansDocument | null;

    @OneToOne(() => User) // Indica que há uma relação OneToOne com a entidade User
    @JoinColumn({ name: "user_id" }) // Especifica a coluna que atua como chave estrangeira
    user: User | null;

    constructor() {
        this.id = uuid();
        this.full_name = "";
        this.contact_email = "";
        this.contact_phone = "";
        this.specialties = "";
        this.age = 0;
        this.state = "";
        this.city = "";
        this.work_location = "";
        this.profilePicture = null;
        this.plansDocument = null;
        this.user = null;
    }
}
