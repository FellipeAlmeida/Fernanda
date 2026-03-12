import Router from 'express'
import autenticacaoJwt from '../middlewares/authenticationJwt.js'
import { loginController } from '../controllers/users.controllers.js'

export const userRouter = Router()

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Fazer login
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
 *         description: Login realizado!
 *       400:
 *         description: Erro de validação.
 *       401:
 *         description: Token não fornecido.
 *       403:
 *         description: Acesso negado
 */
userRouter.post('/login', loginController)