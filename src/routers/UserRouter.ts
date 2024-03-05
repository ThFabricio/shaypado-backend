import { Router } from 'express';
import {createUser, 
        getAllUsers, 
        getUserById, 
        updateUser, 
        deleteUser,
        login,
        createFriendshipAssociation,
        listFriends,
        removeFriendship} from '../controllers/UserController';
import { AuthenticationValidation } from '../middlewares/AuthenticationMiddleware';

const router = Router();
const authValidator = new AuthenticationValidation();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.post(
    '/register',
   // authValidator.validateRegister,
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

router.post(
    '/create-friendship',
    async (req, res, next) => {
        try {
            await createFriendshipAssociation(req, res);
        } catch (error) {
            next(error);
        }
});

router.get('/list-friends/:id', async (req, res, next) => {
    try {
        await listFriends(req, res);
    } catch (error) {
        next(error);
    }
});

router.delete('/delete-friendship/:id', async (req, res, next) => {
    try {
        await removeFriendship(req, res);
    } catch (error) {
        next(error);
    }
});



export default router;
