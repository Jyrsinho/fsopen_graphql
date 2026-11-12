import {gql} from '@apollo/client'


export const ALL_AUTHORS = gql`
    query {
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
    query {
        allBooks {
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