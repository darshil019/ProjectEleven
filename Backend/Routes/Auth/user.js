import { Router } from 'express';

const router = Router();

import {userSignUp,userSignIn} from "../../Controllers/Auth/userAuth/user.js"

router.post("/userSignUp",userSignUp);
router.post("/userSignIn",userSignIn);

export default router;
