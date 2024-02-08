import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import UserRouter from "./UserRouter";
import WorkoutRouter from "./WorkoutRouter";
import ExerciseRouter from "./ExerciseRouter";

const router = Router();

router.get("/", (request, response) =>{
    return response.status(StatusCodes.OK).send("Hello World");
});

router.use("/users", UserRouter);
router.use("/workouts", WorkoutRouter);
router.use("/exercises", ExerciseRouter);


export default router;