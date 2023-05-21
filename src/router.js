import express from 'express'
import userRoutes from './components/user/route.js'
import authRoute from './components/auth/route.js'
import { abc } from './components/auth/rutasabc.js'
// import swaggerUiExpress from "swagger-ui-express";
// import docas from './api/swagger.json';


function router(app){
    const router = express.Router()

    app.use('/api/v1',router)
    router.use('/user',userRoutes)
    router.use('/auth',authRoute)
    router.use('/a', abc)
    //router.use('/docs',swaggerUiExpress.serve, swaggerUiExpress.setup(docas))
}

export {router}