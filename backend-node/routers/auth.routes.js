import { Router } from 'express';

import { register, verifyEmail } from '../controllers/auth.controller.js';

const routers = Router();

routers.post('/register', register);
routers.get('/verify-email/:token', verifyEmail);

export default routers;