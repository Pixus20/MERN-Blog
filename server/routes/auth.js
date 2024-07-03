import { Router } from "express";
import { getMe, login, register } from '../controllers/auth.js';
import { checkOut } from "../utils/checkAuth.js";

const router = new Router()


//register

router.post('/register', register)

//login
router.post('/login', login)


//get me
router.get('/me', checkOut,getMe)



export default router