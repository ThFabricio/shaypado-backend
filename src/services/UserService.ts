import { User } from '../database/entities/User';
import { AppDataSource } from '../database/data-source';
import { LoginResponseDTO, RegisterRequestDTO, RegisterResponseDTO } from '../database/dto/AuthenticationDTO';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Utils from '../shared/Utils';
import { Friendship } from '../database/entities/Friendship';
import { listFriendsResponseDTO } from '../database/dto/FriendshipDTO';

export class UserService {
    private userRepository = AppDataSource.getRepository(User);
    private friendshipRepository = AppDataSource.getRepository(Friendship);

    async createUser(userData: RegisterRequestDTO): Promise<any> {
        try{

            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(userData.password, salt);

            const newUser = new User();
            newUser.name = userData.name ?? '';
            newUser.email = userData.email ?? '';
            newUser.password = hash ?? '';
            newUser.userType = userData.userType ?? '';
            newUser.friendship_code = Utils.generateFriendshipCode(6);
            return await this.userRepository.save(newUser);
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
                    acessToken: token,
                    userType: user.userType
                };
            }
        }
        return { message: 'Invalid email or password' };
    }

    async createFriendshipAssociation(userId: string, friendCode: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { id: userId } });3
        const friend = await this.userRepository.findOne({ where: { friendship_code: friendCode } });
        if (user && friend) {
            const friendship = new Friendship();
            friendship.user = user;
            friendship.friend = friend;
            await this.friendshipRepository.save(friendship);
            return true;
        }
        return false;
    }

    async listFriends(userId: string): Promise<listFriendsResponseDTO> {
        const friendships = await this.friendshipRepository.find({ 
            where: [{ user: { id: userId } }, { friend: { id: userId } }], 
            relations: ["user", "friend"] 
        });

        const amigos = friendships.map(friendship => {
            if (friendship.user?.id === userId) {
                return { name: friendship.friend!.name!, init_day: friendship.init_day!, friend_code: friendship.friend!.friendship_code!}; 
            } else {
                return { name: friendship.friend!.name!, init_day: friendship.init_day!, friend_code: friendship.friend!.friendship_code! };
            }
        });

        const amigosUnicos = Array.from(new Map(amigos.map(amigo => [amigo.friend_code, amigo])).values());

        const user = await this.userRepository.findOne({ where: { id: userId } });
        return { user_friendship_code: user!.friendship_code!, friends: amigosUnicos };
    }

    async removeFriendshipAssociation(userId: string, friendCode: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const friend = await this.userRepository.findOne({ where: { friendship_code: friendCode } });
        if (user && friend) {
            const friendship = await this.friendshipRepository.findOne({ 
                where: [{ user: { id: userId } }, { friend: { id: friend.id } }] 
            });
            if (friendship) {
                await this.friendshipRepository.remove(friendship);
                return true;
            }
        }
        return false;
    };
}



