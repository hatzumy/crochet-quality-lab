import { Router } from 'express';

import { register } from '../controllers/auth.controller.js';

const routers = Router();

routers.post('/register', register);

export default routers;