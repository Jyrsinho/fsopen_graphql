const resolvers = require('./resolvers')
const typeDefs = require('./schema')
const {ApolloServer} = require("@apollo/server");
const {startStandaloneServer} = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getUserFromAuthHeader = async (auth) => {
    if (!auth || !auth.startsWith('Bearer ')) {
        return null
    }
    const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
    console.log('getUserFromAuthHeader: ')
    console.log(decodedToken)
    return User.findById(decodedToken.id)
}

const startServer = (port) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })

    startStandaloneServer(server, {
        listen: {port},
        context: async ({req}) => {
            const auth = req.headers.authorization
            const currentUser = await getUserFromAuthHeader(auth)
            return {currentUser}
        }
    }).then(({url}) => {
    })
}

module.exports = startServer;