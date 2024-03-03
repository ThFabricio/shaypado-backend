import { TrainerProfile } from "../database/entities/TrainerProfile";
import { AppDataSource } from '../database/data-source';
import { TrainerProfileDTO } from "../database/dto/TrainerProfileDTO";
import { ProfilePicture } from "../database/entities/ProfilePicure";
import { PlansDocument } from "../database/entities/PlansDocument";
import { Friendship } from "../database/entities/Friendship";
import { User } from "../database/entities/User";



export class TrainerProfileService {
    private trainerProfileRepository = AppDataSource.getRepository(TrainerProfile);
    private profilePictureRepository = AppDataSource.getRepository(ProfilePicture);
    private plansDocumentRepository = AppDataSource.getRepository(PlansDocument);
    private friendshipRepository = AppDataSource.getRepository(Friendship);
    private userRepository = AppDataSource.getRepository(User);

    async createTrainerProfile(trainerProfileData: TrainerProfileDTO): Promise<TrainerProfile> {

        const newTrainerProfile = new TrainerProfile();
        newTrainerProfile.full_name = trainerProfileData.full_name ?? '';
        newTrainerProfile.contact_email = trainerProfileData.contact_email ?? '';
        newTrainerProfile.contact_phone = trainerProfileData.contact_phone ?? '';
        newTrainerProfile.specialties = trainerProfileData.specialties ?? '';
        newTrainerProfile.age = trainerProfileData.age ?? 0;
        newTrainerProfile.state = trainerProfileData.state ?? '';
        newTrainerProfile.city = trainerProfileData.city ?? '';
        newTrainerProfile.work_location = trainerProfileData.work_location ?? '';
        newTrainerProfile.user = trainerProfileData.user;

        if(trainerProfileData.profile_picure_id) {
            const profilePicture = await this.profilePictureRepository.findOne({ where: { id: trainerProfileData.profile_picure_id } });
            if (profilePicture) {
                newTrainerProfile.profilePicture = profilePicture;
            }
        }

        if(trainerProfileData.plans_document_id) {
            const plansDocument = await this.plansDocumentRepository.findOne({ where: { id: trainerProfileData.plans_document_id } });
            if (plansDocument) {
                newTrainerProfile.plansDocument = plansDocument;
            }
        }

        return await this.trainerProfileRepository.save(newTrainerProfile);
    }

    async getAllTrainerProfiles(): Promise<TrainerProfile[]> {
        return await this.trainerProfileRepository.find({ relations: ["user"] });
    }

    async getTrainerProfileById(profileId: string): Promise<any | null> {
        const trainerProfile = await this.trainerProfileRepository.findOne({ where: { id: profileId }, relations: ["user"] });
        console.log("estou aqui")
        console.log(trainerProfile?.user?.email);
        let response: { [key: string]: string } = {};
        response["email"] = trainerProfile?.user?.email ?? '';
        response["name"] = trainerProfile?.user?.name ?? '';

        response["id"] = trainerProfile?.id ?? '';
        response["full_name"] = trainerProfile?.full_name ?? '';
        response["contact_email"] = trainerProfile?.contact_email ?? '';
        response["contact_phone"] = trainerProfile?.contact_phone ?? '';
        response["specialties"] = trainerProfile?.specialties ?? '';
        response["age"] = trainerProfile?.age?.toString() ?? '';
        response["state"] = trainerProfile?.state ?? '';
        response["city"] = trainerProfile?.city ?? '';
        response["work_location"] = trainerProfile?.work_location ?? '';
        response["profile_picure_id"] = trainerProfile?.profilePicture?.id ?? '';
        response["plans_document_id"] = trainerProfile?.plansDocument?.id ?? '';

        return response;
    }

    async updateTrainerProfile(profileId: string, trainerProfileData: Partial<TrainerProfile>): Promise<TrainerProfile | null> {
        let trainerProfile = await this.trainerProfileRepository.findOne({ where: { id: profileId } });
        if (trainerProfile) {
            trainerProfile = this.trainerProfileRepository.merge(trainerProfile, trainerProfileData);
            return await this.trainerProfileRepository.save(trainerProfile);
        }
        return null;
    }

    async deleteTrainerProfile(profileId: string): Promise<boolean> {
        const trainerProfile = await this.trainerProfileRepository.findOne({ where: { id: profileId } });
        if (trainerProfile) {
            await this.trainerProfileRepository.remove(trainerProfile);
            return true;
        }
        return false;
    }

    async uploadPicure(name: string, path: string): Promise<any> {
        
        const profilePicture = new ProfilePicture();
        profilePicture.name = name;
        profilePicture.path = path;

        return await this.profilePictureRepository.save(profilePicture);      
    }

    async uploadDocument(name: string, path: string): Promise<any> {
        
        const profilePicture = new ProfilePicture();
        profilePicture.name = name;
        profilePicture.path = path;

        return await this.plansDocumentRepository.save(profilePicture);      
    }

    async associateProfilePicture(profileId: string, pictureId: string): Promise<any> {
        const trainerProfile = await this.trainerProfileRepository.findOne({ where: { id: profileId } });
        console.log(trainerProfile);

        const profilePicture = await this.profilePictureRepository.findOne({ where: { id: pictureId } });
        console.log(profilePicture);

        if (trainerProfile && profilePicture) {
            trainerProfile.profilePicture = profilePicture;
            return await this.trainerProfileRepository.save(trainerProfile);
        }
        return null;
    };

    async associatePlansDocument(profileId: string, documentId: string): Promise<any> {
        const trainerProfile = await this.trainerProfileRepository.findOne({ where: { id: profileId } });
        const plansDocument = await this.plansDocumentRepository.findOne({ where: { id: documentId } });

        if (trainerProfile && plansDocument) {
            trainerProfile.plansDocument = plansDocument;
            return await this.trainerProfileRepository.save(trainerProfile);
        }
        return null;
    }

    async associateStudentProfile(profileId: string, studentProfileId: string): Promise<boolean> {
        //pegando o usuario de treinador atravez do id de profile trainer
        const trainerProfile = await this.trainerProfileRepository.findOne({ where: { id: profileId } });
        const userTrainer = await this.userRepository.findOne({ where: { id: trainerProfile?.user?.id } });
        //pegando o usuario de aluno
        const studentProfile = await this.userRepository.findOne({ where: { id: studentProfileId } });
        const userStudent = await this.userRepository.findOne({ where: { id: studentProfile?.id } });
        //verificando se ambos existem
        if (userTrainer && userStudent) {
            //criando a amizade
            const friendship = new Friendship();
            friendship.user = userTrainer;
            friendship.friend = userStudent;
            await this.friendshipRepository.save(friendship);
            return true;
        }
        return false;
    }
}
