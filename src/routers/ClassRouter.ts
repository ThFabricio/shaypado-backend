import { Router } from "express";
import { createClass, getAllClasses, getClassById, updateClass, deleteClass } from "../controllers/ClassController";
import { ClassMiddlewares } from "../middlewares/ClassMiddlewares";

const router = Router();
const classMiddlewares = new ClassMiddlewares();

router.post(
    '/',
    classMiddlewares.validateCreateClass,
    async (req, res, next) => {
        try {
            await createClass(req.body, res);
        } catch (error) {
            next(error);
        }
    }
);
router.get('/', getAllClasses);
router.get('/:id', getClassById);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

export default router;
