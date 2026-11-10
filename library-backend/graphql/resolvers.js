const Book = require('../models/book')
const Author = require('../models/author')
const {GraphQLError} = require("graphql/error");

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
        }
    }
}

module.exports = resolvers;