import { StudentProfile } from "../database/entities/StudentProfile";
import { AppDataSource } from '../database/data-source';
import { StudentProfileDTO } from "../database/dto/StudentProfileDTO";
import { User } from "../database/entities/User";

export class StudentProfileService {
    private studentProfileRepository = AppDataSource.getRepository(StudentProfile);

    
    async createStudentProfile(studentProfileData: StudentProfileDTO): Promise<StudentProfile> {

        const newStudentProfile = new StudentProfile();
        newStudentProfile.fat_percentage = studentProfileData.fat_percentage ?? '';
        newStudentProfile.arm_circumference = studentProfileData.arm_circumference ?? '';
        newStudentProfile.waist_circumference = studentProfileData.waist_circumference ?? '';
        newStudentProfile.abdomen_circumference = studentProfileData.abdomen_circumference ?? '';
        newStudentProfile.hip_circumference = studentProfileData.hip_circumference ?? '';
        newStudentProfile.thigh_circumference = studentProfileData.thigh_circumference ?? '';
        newStudentProfile.leg_circumference = studentProfileData.leg_circumference ?? '';
        newStudentProfile.height = studentProfileData.height ?? '';
        newStudentProfile.weight = studentProfileData.weight ?? '';
        newStudentProfile.age = studentProfileData.age; // Considerando que a idade é um número, não aplicamos o operador de coalescência nula aqui.
        newStudentProfile.shoulder_circumference = studentProfileData.shoulder_circumference ?? '';
        newStudentProfile.user = studentProfileData.user;

        return await this.studentProfileRepository.save(newStudentProfile);
    }

    async getAllStudentProfiles(): Promise<StudentProfile[]> {
        return await this.studentProfileRepository.find({ relations: ["user"] });
    }

    async getStudentProfileById(profileId: string): Promise<StudentProfile | null> {
        return await this.studentProfileRepository.findOne({ where: { id: profileId }, relations: ["user"] });
    }

    async updateStudentProfile(profileId: string, studentProfileData: Partial<StudentProfile>): Promise<StudentProfile | null> {
        let studentProfile = await this.studentProfileRepository.findOne({ where: { id: profileId } });
        if (studentProfile) {
            studentProfile = this.studentProfileRepository.merge(studentProfile, studentProfileData);
            return await this.studentProfileRepository.save(studentProfile);
        }
        return null;
    }


    async deleteStudentProfile(profileId: string): Promise<boolean> {
        const studentProfile = await this.studentProfileRepository.findOne({ where: { id: profileId } });
        if (studentProfile) {
            await this.studentProfileRepository.remove(studentProfile);
            return true;
        }
        return false;
    }
}
