const fs = require('fs')
fs.writeFileSync('./.env', `LOGMODE=DEV\n
API_KEY=${process.env.API_KEY}\n
AUTH_DOMAIN=${process.env.AUTH_DOMAIN}\n
DATABASE_URL=${process.env.DATABASE_URL}\n
PROJECT_ID=${process.env.PROJECT_ID}\n
STORAGE_BUCKET=${process.env.STORAGE_BUCKET}\n
MESSAGING_SENDER_ID=${process.env.MESSAGING_SENDER_ID}\n`)

