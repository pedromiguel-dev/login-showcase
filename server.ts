
// @ts-ignore
import express from "express";
import rootRoute from "./routes";

const app = express()
const PORT = process.env.PORT || 8090

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', rootRoute )

app.listen(PORT, () => {
    console.log("Running on 8090")
})