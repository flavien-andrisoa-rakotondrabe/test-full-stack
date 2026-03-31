import { Router } from 'express';
import { login, register } from '@/controllers/auth.controller';
import { LoginSchema, RegisterSchema } from '@/types/auth.type';
import { zodValidate } from '@/middlewares/zodValidate';

const router = Router();

router.post('/register', zodValidate(RegisterSchema), register);
router.post('/login', zodValidate(LoginSchema), login);

export default router;
