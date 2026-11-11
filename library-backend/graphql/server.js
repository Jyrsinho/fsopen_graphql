const resolvers = require('./resolvers')
const typeDefs = require('./schema')
const {ApolloServer} = require("@apollo/server");
const {startStandaloneServer} = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getUserFromAuthHeader = async (auth) => {
    if (!auth || !auth.startsWith('Bearer ')) {
        console.log('ei selvinnyt validoinnista')
        return null
    }
    const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
    console.log('token: ', decodedToken)
    console.log('token.id: - ', decodedToken.id)
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
            console.log('auth', auth)
            const currentUser = await getUserFromAuthHeader(auth)
            console.log(currentUser)
            return {currentUser}
        }
    }).then(({url}) => {
        console.log(`Server ready at ${url}`)
    })
}

module.exports = startServer;