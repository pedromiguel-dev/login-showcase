
// @ts-ignore
import express from "express";

const app = express()
const PORT = process.env.PORT || 8090

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({message: 'get on root directory'})
})

app.listen(PORT, () => {
    console.log("Running on 8090")
})