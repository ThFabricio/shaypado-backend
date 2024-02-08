import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import UserRouter from "./UserRouter";
import WorkoutRouter from "./WorkoutRouter";


const router = Router();

router.get("/", (request, response) =>{
    return response.status(StatusCodes.OK).send("Hello World");
});

router.use("/users", UserRouter);
router.use("/workouts", WorkoutRouter);


export default router;