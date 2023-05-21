import express from "express";
import { router } from "../router.js";
import cors from 'cors'
import { errors } from "../network/errors.js";
const PORT = 3012;

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


router(app)
app.use(errors)

app.listen(PORT,()=>{
    console.log('Running server at port '+PORT)
})