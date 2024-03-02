import { TrainerProfile } from "../database/entities/TrainerProfile";
import { AppDataSource } from '../database/data-source';
import { TrainerProfileDTO } from "../database/dto/TrainerProfileDTO";
import { User } from "../database/entities/User";


export class TrainerProfileService {
    private trainerProfileRepository = AppDataSource.getRepository(TrainerProfile);
    private userRepository = AppDataSource.getRepository(User);

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
        newTrainerProfile.profilePicture = trainerProfileData.profilePicture ?? '';
        newTrainerProfile.plansDocument = trainerProfileData.plansDocument ?? '';
        newTrainerProfile.user = user;

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
}
