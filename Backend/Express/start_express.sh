echo "Iniciando servidor express!"
node app/server.js

echo "Verficiando histórico de migrations..."
npx prisma migrate deploy