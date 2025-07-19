import express from 'express';
import { isAuthenticated, logoutUser, registerUser } from '../controller/user.js';
import { getUserdetails, loginUser } from '../controller/user.js';
import { userMiddleware } from '../middleware/user.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.get('/user-details',userMiddleware, getUserdetails);
userRouter.get('/is-authenticated', userMiddleware, isAuthenticated);

export default userRouter;
