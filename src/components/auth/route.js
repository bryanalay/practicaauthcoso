import express from 'express'
import { loginController, registerController } from './controller.js'

const authRoute = express.Router()

authRoute.post('/login', loginController)

//authRoute.post('/register', registerController)

authRoute.get('/a', (req,res)=>{
    res.send('auth/a funciona')
})

export default authRoute;