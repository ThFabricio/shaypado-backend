import { Router } from "express";
import { StatusCodes } from "http-status-codes";


const router = Router();

router.get("/", (request, response) =>{
    return response.status(StatusCodes.OK).send("Hello World");
});

export default router;