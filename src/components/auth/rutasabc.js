import {Router} from 'express'

const abc = Router()


abc.get('/a',(req,res)=>{
    res.send('Hola ruta abc si funciona')
})

export { abc }