import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import UserRouter from "./UserRouter";
import WorkoutRouter from "./WorkoutRouter";
import ExerciseRouter from "./ExerciseRouter";
import TrainerProfileRouter from "./TrainerProfileRouter";
import StudentProfileRouter from "./StudentProfileRouter";

const router = Router();

router.get("/", (request, response) =>{
    return response.status(StatusCodes.OK).send("Hello World");
});

router.use("/users", UserRouter);
router.use("/workouts", WorkoutRouter);
router.use("/exercises", ExerciseRouter);
router.use("/trainer_profile", TrainerProfileRouter)
router.use("/student_profile", StudentProfileRouter)


export default router;