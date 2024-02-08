import { Router } from 'express';
import {createUser, 
        getAllUsers, 
        getUserById, 
        updateUser, 
        deleteUser,
        login} from '../controllers/UserController';
import { AuthenticationValidation } from '../middlewares/AuthenticationMiddleware';

const router = Router();
const authValidator = new AuthenticationValidation();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.post(
    '/register',
    authValidator.validateRegister,
    async (req, res, next) => {
        try {
            await createUser(req.body, res);      
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    '/login',
    authValidator.validateLogin,
    async (req, res, next) => {
        try {
            await login(req, res);  
        } catch (error) {
            next(error);
        }
    }
);



export default router;
