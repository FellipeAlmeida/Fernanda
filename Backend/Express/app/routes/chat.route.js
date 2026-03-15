import Router from 'express'
import autenticacaoJwt from '../middlewares/authenticationJwt.js'
import { botServiceController } from '../controllers/chat.controllers.js'

export const chatRouter = Router()

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Enviar mensagem para o chatbot
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conversationId:
 *                 type: integer
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Resposta do chatbot
 */
chatRouter.post("/chat", autenticacaoJwt, botServiceController)