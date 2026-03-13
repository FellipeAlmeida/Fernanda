import Router from 'express'
import autenticacaoJwt from '../middlewares/authenticationJwt.js'
import { loginController } from '../controllers/users.controllers.js'
import { registerController } from '../controllers/users.controllers.js'
import { userMeController } from '../controllers/users.controllers.js'

export const userRouter = Router()

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Fazer login.
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado!
 *       400:
 *         description: Erro de validação.
 */
userRouter.post('/auth/login', loginController)

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar conta.
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Conta Registrada!
 *       400:
 *         description: Erro de validação.
 */
userRouter.post('/auth/register', registerController)

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Buscar usuário atual
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 */
userRouter.get('/users/me', autenticacaoJwt, userMeController)