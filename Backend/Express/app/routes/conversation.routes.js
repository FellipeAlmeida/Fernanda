import Router from 'express'
import autenticacaoJwt from '../middlewares/authenticationJwt.js'
import { conversationCreateController } from '../controllers/conversations.controllers.js'
import { conversationListController } from '../controllers/conversations.controllers.js'
import { conversationGetController } from '../controllers/conversations.controllers.js'

export const conversationRouters = Router()

/**
 * @swagger
 * /conversations:
 *   post:
 *     summary: Criar conversa.
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Conversa criada!
 *       400:
 *         description: Erro de validação.
 *       401:
 *         description: Token não fornecido.
 */
conversationRouters.post("/conversations", autenticacaoJwt, conversationCreateController)

/**
 * @swagger
 * /conversations:
 *   get:
 *     summary: Lista conversas.
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conversas listadas!
 *       400:
 *         description: Erro de validação.
 *       401:
 *         description: Token não fornecido ou inválido.
 */
conversationRouters.get("/conversations", autenticacaoJwt, conversationListController)

/**
 * @swagger
 * /conversations/{id}/messages:
 *   get:
 *     summary: Busca mensagens por id de conversas.
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da conversa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Conversas retornadas!
 *       400:
 *         description: Erro de validação.
 *       401:
 *         description: Token não fornecido ou inválido.
 */
conversationRouters.get("/conversations/:id/messages", autenticacaoJwt, conversationGetController)