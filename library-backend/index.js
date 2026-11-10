require('dotenv').config()

const startServer = require("./graphql/server")

const PORT = process.env.PORT || 4000

startServer(PORT)

