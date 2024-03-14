import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import cors from "cors";
import UserRouter from "./UserRouter";
import WorkoutRouter from "./WorkoutRouter";
import ExerciseRouter from "./ExerciseRouter";
import TrainerProfileRouter from "./TrainerProfileRouter";
import StudentProfileRouter from "./StudentProfileRouter";
import ClassRouter from "./ClassRouter";

const router = Router();

router.get("/", (request, response) =>{
    return response.status(StatusCodes.OK).send("Hello World");
});

router.use(cors());

router.use("/users", UserRouter);
router.use("/workouts", WorkoutRouter);
router.use("/exercises", ExerciseRouter);
router.use("/trainer_profile", TrainerProfileRouter)
router.use("/student_profile", StudentProfileRouter)
router.use("/classes", ClassRouter);


export default router;