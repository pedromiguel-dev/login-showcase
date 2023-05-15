
// @ts-ignore
import express from "express";
import rootRoute from "./routes";
import cookieparser from "cookie-parser";
import corsOptions from "./config/corsOptions";
import cors from "cors";
import credentials from "./middlewares/credentials";
const app = express()
const PORT = process.env.PORT || 8090

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());

app.use(credentials)
app.use(cors(corsOptions));
app.use('/', rootRoute )

app.listen(PORT, () => {
    console.log("Running on 8090")
})