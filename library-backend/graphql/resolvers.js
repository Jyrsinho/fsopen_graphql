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
            return Book.find({}).populate('author');
        },
        allAuthors: async (root, authors) => {
            return Author.find({})
        }
    },
    Mutation: {
        addBook: async (root, args) => {
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

        editAuthor: async (root, args) => {
            const authorToEdit = await Author.findOne({name: args.name})
            if (!authorToEdit) {
                throw new GraphQLError(`authorToEdit is missing ${args.name}`)
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
            const user = User.findOne({username: args.username})
            if (!user || args.password !== 'secret') {
                throw new GraphQLError('login failed ', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: [args.username,  args.password]
                    }
                })
            }
            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    }
}

module.exports = resolvers;