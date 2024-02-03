import express, { Application } from "express";
import "dotenv/config";
import router from "./routers";


const app: Application = express();
const port: String = process.env.PORT || "3001";

app.use(express.json({ limit: "2mb"}));
app.use(router);

app.listen(port, async() => {
    console.log(`Server is running on port ${port}`);
});

export default app;