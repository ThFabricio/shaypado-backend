import { PlansDocument } from "../entities/PlansDocument";
import { ProfilePicture } from "../entities/ProfilePicure";
import { User } from "../entities/User";

export interface TrainerProfileDTO {
    id: string;
    full_name: string;
    contact_email: string;
    contact_phone: string;
    specialties: string;
    age: number;
    state: string;
    city: string;
    work_location: string;
    profile_picure_id?: string;
    plans_document_id?: string;
    user: User;
}

export interface ListTrainerProfilesDTO {
    // Dados Usuario
    name: string;
    email: string;
    friendship_code: string;

    // Dados Perfil
    full_name: string;
    contact_email: string;
    contact_phone: string;
    specialties: string;
    age: number;
    state: string;
    city: string;
    work_location: string;

    // Dados Documento
    profile_picure?: ProfilePicture;
    plans_document?: PlansDocument;
}

