import { TrainerProfile } from "../database/entities/TrainerProfile";
import { AppDataSource } from '../database/data-source';
import { TrainerProfileDTO } from "../database/dto/TrainerProfileDTO";
import { User } from "../database/entities/User";
import { ProfilePicture } from "../database/entities/ProfilePicure";
import { PlansDocument } from "../database/entities/PlansDocument";


export class TrainerProfileService {
    private trainerProfileRepository = AppDataSource.getRepository(TrainerProfile);
    private userRepository = AppDataSource.getRepository(User);
    private profilePictureRepository = AppDataSource.getRepository(ProfilePicture);
    private plansDocumentRepository = AppDataSource.getRepository(PlansDocument);

    async createTrainerProfile(trainerProfileData: TrainerProfileDTO): Promise<TrainerProfile> {
        const user = await this.userRepository.findOne({ where: { id: trainerProfileData.user } });

        if (!user) {
            throw new Error("User not found");
        }

        const newTrainerProfile = new TrainerProfile();
        newTrainerProfile.full_name = trainerProfileData.full_name ?? '';
        newTrainerProfile.contact_email = trainerProfileData.contact_email ?? '';
        newTrainerProfile.contact_phone = trainerProfileData.contact_phone ?? '';
        newTrainerProfile.specialties = trainerProfileData.specialties ?? '';
        newTrainerProfile.age = trainerProfileData.age ?? 0;
        newTrainerProfile.state = trainerProfileData.state ?? '';
        newTrainerProfile.city = trainerProfileData.city ?? '';
        newTrainerProfile.work_location = trainerProfileData.work_location ?? '';
        newTrainerProfile.user = user;

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

    async getTrainerProfileById(profileId: string): Promise<TrainerProfile | null> {
        return await this.trainerProfileRepository.findOne({ where: { id: profileId }, relations: ["user"] });
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
}
