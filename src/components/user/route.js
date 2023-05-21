import express from "express"
import { checkAuth } from './secure.js'
import { getUsers, getUser, saveUser, deleteUser, getAllUsers, updateUser, proof } from "./controller.js"

const router = express.Router()

router.get('/', getUsers)

router.get('/pescao', proof)

router.get('/all', getAllUsers)

router.get('/:id', getUser)

router.post('/save', saveUser)

router.delete('/delete/:id', deleteUser)

router.put('/', checkAuth('update'), updateUser)

export default router;