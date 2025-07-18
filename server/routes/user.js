import express from 'express';
import { logoutUser, registerUSer } from '../controller/user.js';
import { getUserdetails, loginUser } from '../controller/user.js';
import { userMiddleware } from '../middleware/user.js';


const userRouter = express.Router();

userRouter.post('/register', registerUSer);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.get('/user-details',userMiddleware, getUserdetails);

export default userRouter;
