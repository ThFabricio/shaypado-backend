import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import UserRouter from "./UserRouter";


const router = Router();

router.get("/", (request, response) =>{
    return response.status(StatusCodes.OK).send("Hello World");
});

router.use("/users", UserRouter);

export default router;