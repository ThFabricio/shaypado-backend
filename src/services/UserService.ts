import { User } from '../database/entities/User';
import { AppDataSource } from '../database/data-source';
import { LoginResponseDTO, RegisterRequestDTO, RegisterResponseDTO } from '../database/dto/AuthenticationDTO';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    async createUser(userData: RegisterRequestDTO): Promise<RegisterResponseDTO> {
        try{

            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(userData.password, salt);

            const newUser = new User();
            newUser.name = userData.name ?? '';
            newUser.email = userData.email ?? '';
            newUser.password = hash ?? '';
            newUser.userType = userData.userType ?? '';
            newUser.weigth = userData.weigth ?? '';
            newUser.height = userData.height ?? '';
            newUser.workoutDays = userData.workoutDays ?? '';
            newUser.any_disease = userData.any_disease ?? '';
            await this.userRepository.save(newUser);
            if (newUser) {
                const secret = process.env.JWT_SECRET;

                const token = jwt.sign({id: newUser.id,
                                        email: newUser.email,
                                        userType: newUser.userType
                                        }, secret!, {});
                return {message: 'User created successfully',
                        acessToken: token
                    };
            }
            return { message: 'Error creating user' };
        } catch (error: any) {
            return { message: error.message };
        }
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById(userId: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { id: userId } })
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email: email } })
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

    async login(email: string, password: string): Promise<LoginResponseDTO> {
        const user = await this.userRepository.findOne({ where: { email: email } });
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password!);
            if (validPassword) {
                const secret = process.env.JWT_SECRET;
                const token = jwt.sign({id: user.id,
                                        email: user.email,
                                        userType: user.userType
                                        }, secret!, {});
                return {
                    message: 'User logged in successfully',
                    acessToken: token
                };
            }
        }
        return { message: 'Invalid email or password' };
    }
}



