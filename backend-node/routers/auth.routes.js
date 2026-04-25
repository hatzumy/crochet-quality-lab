import { Router } from 'express';
import { registerSchema } from '../schemas/auth.schema.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { register, verifyEmail, resendEmail  } from '../controllers/auth.controller.js';

const routers = Router();

routers.post('/register', validateSchema(registerSchema), register);
routers.get('/verify-email/:token', verifyEmail);
routers.post('/resend-email', resendEmail);

export default routers;