
import "dotenv/config";
import  Express  from "express";
import cors from "cors";
import routes from "./routes/index.routes";
const app=Express();
const PORT=process.env.PORT || 5000;
app.use(cors());
app.use(Express.json());

app.use(routes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})