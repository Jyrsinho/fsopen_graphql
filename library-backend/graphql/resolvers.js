const Book = require('../models/book')
const Author = require('../models/author')
const User = require('../models/user')
const {GraphQLError} = require("graphql/error");
const jwt = require("jsonwebtoken");

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.author) {
                const author = await Author.findOne({name: args.author})
                console.log('author', author)
                return Book.find({author: author._id}).populate('author');
            }
            if (args.genres) {
                return Book.find( {genres: { $in: args.genres }}).populate('author');
            }
            return Book.find({}).populate('author');
        },
        allAuthors: async (root, args) => {
            return Author.find({})
        },
        recommendations: async (root, args, context) => {
            const currentUser = await User.findById(context.currentUser._id)
            if (!currentUser) return null
            const favoriteGenre = currentUser.favoriteGenre
            return Book.find({genres: { $all: favoriteGenre}}).populate('author');
        },
        me: async (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        _resetDatabase: async () => {
            if (process.env.NODE_ENV !== 'test') {
                throw new GraphQLError('_resetDatabase is only available in test mode',);
            }
            await Author.deleteMany({})
            await Book.deleteMany({})
            await User.deleteMany({})
        },
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            console.log('Adding Book resolver:')
            console.log('context', context)
            console.log('currentUser: -', currentUser)

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    }
                })
            }

            const bookExists = await Book.exists({title: args.title})
            if (bookExists) {
                throw new GraphQLError(`Book title must be unique ${args.title}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title
                    }
                })
            }

            let author = await Author.findOne({name: args.author})
            if (!author) {
                author = new Author({name: args.author})
            }

            const book = new Book({
                title: args.title,
                author: author,
                published: args.published,
                genres: args.genres,
            })

            try {
                await author.save()
                await book.save()
            } catch (error) {
                throw new GraphQLError(`Error creating book: ${error.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.setBornTo,
                        error
                    }
                })
            }
            return book
        },

        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                    }
                })
            }

            const authorToEdit = await Author.findOne({name: args.name})
            if (!authorToEdit) {
                return null
            }
            authorToEdit.born = args.setBornTo
            return authorToEdit.save()
        },

        createUser: async (root, args) => {
            const user = new User({
                username: args.username, favoriteGenre: args.favoriteGenre
            })

            return user.save()
                .catch(error => {
                    throw new GraphQLError(`Error creating user: ${error.message}`, {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.username,
                            error
                        }
                    })
                })
        },
        login: async (root, args) => {
            console.log('inside login')
            const user = await User.findOne({username: args.username})
            console.log('user',  user)
            if (!user || args.password !== 'secret') {
                console.log('throwing new graphQLError')
                throw new GraphQLError('login failed ', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: [args.username, args.password]
                    }
                })
            }
            const userForToken = {
                username: user.username,
                id: user._id
            }
            console.log('userForToken - ' , userForToken)
            console.log('exiting login')
            return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
        }
    }
}

module.exports = resolvers;