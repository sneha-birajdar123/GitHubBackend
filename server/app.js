import express from "express"
import config from "config"
import "./utils/dbConnect.js"
import userRouter from "./controllers/users/index.js"
import reposRouter from "./controllers/repos/index.js"
import gistRouter from "./controllers/gists/index.js"
import publicRouter from "./public/index.js"
import authMiddleware from "./middleware/auth.js"
import ratelimit from "express-rate-limit"

const app = express()

const PORT = config.get("PORT")

app.use(express.json());

let limiter = ratelimit({
    windowMs: 10*60*1000,  
    limit: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Cannot send request! Wait for server to respond!",
    statusCode: 429
})

app.get("/home", (req, res)=>{
    try {

        res.status(200).json({msg: `HOME🏡`})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})


app.use("/api/public", publicRouter)
app.use("/api/public", limiter)

app.use(authMiddleware)

app.use("/api/private/users", userRouter);
app.use("/api/private/repos", reposRouter);
app.use("/api/private/gists", gistRouter)


app.listen(PORT, ()=>{
    console.log(`Server is up and running at port ${PORT}`);
})