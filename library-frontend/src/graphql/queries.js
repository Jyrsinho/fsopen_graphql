import {gql} from '@apollo/client'

export const ME = gql`
query {
    me {
        username,
        favoriteGenre
    }
}`

export const ALL_AUTHORS = gql`
    query  {
        allAuthors {
            name
            born
            id
        }}
`

export const RECOMMENDATIONS = gql`
query {
    recommendations {
        title
        author {
            name
            born
        }
        genres
        published
        id
    }
}`

export const ALL_BOOKS = gql`
    query allBooks($genres: [String!]) {
        allBooks (genres: $genres) {
            title
            author {
                name
                born
            }
            published
            id
            genres
        }
    }`