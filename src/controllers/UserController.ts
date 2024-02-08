import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { RegisterRequestDTO } from '../database/dto/AuthenticationDTO';

const userService = new UserService();

export const createUser = async (req: RegisterRequestDTO, res: Response) => {
    try {
        const exist = await userService.getUserByEmail(req.email);
        if (exist) {
            return res.status(400).json({ message: 'User already exists' });
        } 
        const user = await userService.createUser(req);
        res.status(201).json(user);
        
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const user = await userService.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const user = await userService.updateUser(userId, req.body);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        const result = await userService.deleteUser(userId);
        if (result) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await userService.login(email, password);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
};