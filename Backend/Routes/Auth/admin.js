import { Router } from 'express';

const router = Router();

import {adminSignIn, adminSignUp} from "../../Controllers/Auth/adminAuth/admin.js"

router.post("/adminSignUp",adminSignUp);
router.post('/adminSignIn',adminSignIn)

export default router;
