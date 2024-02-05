import express, { Application } from "express";
import "dotenv/config";
import router from "./routers";
import { AppDataSource } from "./database/data-source";


const app: Application = express();
const port: String = process.env.PORT || "3001";

app.use(express.json({ limit: "2mb"}));
app.use(router);

AppDataSource.initialize().then(() => {
    console.log("Database connection established");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.log(error);
});

export default app;