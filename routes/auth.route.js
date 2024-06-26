import { Router } from 'express';
import { infoUser, login, register, refreshToken, logout } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
import { requireToken } from '../middlewares/requireToken.js';
const router = Router(); // middleware para gestionar nuestras rutas en los sitios web

router.post(
    '/register',
    [
        body('correo', 'Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
        body("password", "Mínimo 6 carácteres")
        .trim()
        .isLength({min: 6}),
        body("password", "Formato de password incorrecta")
        .trim()
        .isLength({min: 6})
    ],
    validationResultExpress, // Middleware, antes de que se ejecute registro, ejecuta esta funcion de validación con express, es importante el Next para decirle que continue
    register
); // Validar Email

router.post('/login', [
        body('correo', 'Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail()],
        validationResultExpress,
        login
);

router.get('/protected', requireToken, infoUser);
router.get('/refresh', refreshToken)
router.get('/logout', logout)


export default router; //Export default le podemos asignar el nombre que necesitamos

