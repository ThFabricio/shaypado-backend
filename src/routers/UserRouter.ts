import { Router } from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/UserController';

const router = Router();

router.post(
    '/', 
    async (req, res, next) => {
        try {
            await createUser(req, res);      
        } catch (error) {
            next(error);
        }
    });
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
