import swaggerJsDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API",
      version: "1.0.0",
    },
  },
  apis: [
    "./app/routes/*.js",
    "./app/schemas/*.js"
  ], // caminho dos arquivos com swagger
}

export const swaggerSpec = swaggerJsDoc(options)

