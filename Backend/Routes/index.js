import express from 'express';

const router = express.Router();

import userAuthRoutes from "../Routes/Auth/user.js"
import adminAuthRoutes from "../Routes/Auth/admin.js"

router.use("/user",userAuthRoutes);

router.use("/admin",adminAuthRoutes);

export default router;