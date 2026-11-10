const {models} = require("mongoose");
const Book = require('../models/book')
const Author = require('../models/author')
const {GraphQLError} = require("graphql/error");

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            return Book.find({})
        },
        allAuthors: async (root, authors) => {
            return Author.find({})
        }
    },
    Book: {
        author: ({name, birthYear}) => {
            return {
                name: name,
                birthYear: birthYear,
            }
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

            const existingAuthor = await Author.findOne({name: args.author})
            const author = existingAuthor ?? new Author({name: args.author})
            await author.save()

            const book = new Book({
                title: args.title,
                author: author,
                published: args.published,
            })

            return book.save()
        },

        editAuthor: (root, args) => {
            const authorToEdit = authors.find(author => author.name === args.name)
            if (!authorToEdit) {
                throw new GraphQLError(`authorToEdit is missing ${args.name}`)
            }
            authorToEdit.born = args.setBornTo
            authors.map(author => author.name === args.name ? authorToEdit : author)
            return authorToEdit
        }
    }
}

module.exports = resolvers;