import { StudentProfile } from "../database/entities/StudentProfile";
import { AppDataSource } from '../database/data-source';
import { StudentProfileDTO } from "../database/dto/StudentProfileDTO";
import { User } from "../database/entities/User";

export class StudentProfileService {
    private studentProfileRepository = AppDataSource.getRepository(StudentProfile);

    
    async createStudentProfile(studentProfileData: StudentProfileDTO): Promise<StudentProfile> {

        const newStudentProfile = new StudentProfile();
        newStudentProfile.gender = studentProfileData.gender ?? '';
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

    async getStudentProfileById(profileId: string): Promise<any | null> {
        const studentProfile = await this.studentProfileRepository.findOne({ where: { id: profileId }, relations: ["user"] });
        let response: { [key: string]: string } = {};
        response["email"] = studentProfile?.user?.email ?? '';
        response["name"] = studentProfile?.user?.name ?? '';

        response["id"] = studentProfile?.id ?? '';
        response["gender"] = studentProfile?.gender ?? '';
        response["fat_percentage"] = studentProfile?.fat_percentage ?? '';
        response["arm_circumference"] = studentProfile?.arm_circumference ?? '';
        response["waist_circumference"] = studentProfile?.waist_circumference ?? '';
        response["abdomen_circumference"] = studentProfile?.abdomen_circumference ?? '';
        response["hip_circumference"] = studentProfile?.hip_circumference ?? '';
        response["thigh_circumference"] = studentProfile?.thigh_circumference ?? '';
        response["leg_circumference"] = studentProfile?.leg_circumference ?? '';
        response["height"] = studentProfile?.height ?? '';
        response["weight"] = studentProfile?.weight ?? '';
        response["age"] = studentProfile?.age.toString() ?? '';
        response["shoulder_circumference"] = studentProfile?.shoulder_circumference ?? '';

        return response;
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
