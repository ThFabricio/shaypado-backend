import { Class } from "../database/entities/Class";
import { AppDataSource } from '../database/data-source';
import { ClassDTO } from "../database/dto/ClassDTO";
import { User } from "../database/entities/User";
import { Workout } from "../database/entities/Workout";

export class ClassService {
    private classRepository = AppDataSource.getRepository(Class);
    private workoutRepository = AppDataSource.getRepository(Workout);

    async createClass(classData: ClassDTO): Promise<Class> {
        
        const newClass = new Class();
        newClass.name = classData.name ?? '';
        newClass.days_of_week = classData.days_of_week;
        newClass.start_time = classData.start_time;
        newClass.end_time = classData.end_time;
        newClass.friends_code = classData.friends_code ?? [];

        if(classData.workouts) {
            const workouts = await this.workoutRepository.findByIds(classData.workouts);
            newClass.workouts = workouts;
        }
        return await this.classRepository.save(newClass);
    }

    async getAllClasses(): Promise<Class[]> {
        return await this.classRepository.find();
    }

    async getClassById(classId: string): Promise<Class | null> {
        return await this.classRepository.findOne({ where: { id: classId } })
    }

    async updateClass(classId: string, classData: Partial<Class>): Promise<Class | null> {
        let class_ = await this.classRepository.findOne({ where: { id: classId } });
        if (class_) {
            class_ = this.classRepository.merge(class_, classData);
            return await this.classRepository.save(class_);
        }
        return null;
    }

    async deleteClass(classId: string): Promise<boolean> {
        const class_ = await this.classRepository.findOne({ where: { id: classId } });
        if (class_) {
            await this.classRepository.remove(class_);
            return true;
        }
        return false;
    }
    
    async studentAboutToJoinClass(userId: string, classId: string): Promise<Class | null> {
        const class_ = await this.classRepository.findOne({ where: { id: classId } });
        // achando o usuario
        const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });
        if (class_ && user) {
            if (user.userType === 'student') {
                if (class_.friends_code.includes(user.friendship_code? user.friendship_code : '')) {
                    return class_;
                }

            }

        }
        return null;
    }
}