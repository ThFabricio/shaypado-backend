import { User } from '../database/entities/User';
import { AppDataSource } from '../database/data-source';

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async createUser(userData: Partial<User>): Promise<User> {
        console.log('uepa');
        const newUser = new User();
        newUser.name = userData.name ?? '';
        newUser.email = userData.email ?? '';
        newUser.password = userData.password ?? '';
        newUser.userType = userData.userType ?? '';
        newUser.weigth = userData.weigth ?? '';
        newUser.height = userData.height ?? '';
        newUser.workoutDays = userData.workoutDays ?? '';
        newUser.any_disease = userData.any_disease ?? '';
        return await this.userRepository.save(newUser);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById(userId: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { id: userId } })
    }

    async updateUser(userId: string, userData: Partial<User>): Promise<User | null> {
        let user = await this.userRepository.findOne({ where: { id: userId } });
        if (user) {
            user = this.userRepository.merge(user, userData);
            return await this.userRepository.save(user);
        }
        return null;
    }

    async deleteUser(userId: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (user) {
            await this.userRepository.remove(user);
            return true;
        }
        return false;
    }
}
