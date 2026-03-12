import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { userRouter } from './routes/users.routes.js'
import { swaggerSpec } from './app.js'
import swaggerUI from 'swagger-ui-express'

dotenv.config()
export const app = express()

app.get('/', (req, res) => {
    return res.send('Servidor express rodando!')
})

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.listen(5000, () => {
    console.log('Servidor express rodando na porta 5000!')
})