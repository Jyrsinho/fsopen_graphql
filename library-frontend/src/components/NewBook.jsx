import {useState} from 'react'
import {useMutation} from "@apollo/client/react";
import {CREATE_BOOK} from "../graphql/mutations.js";
import {ALL_AUTHORS, ALL_BOOKS} from "../graphql/queries.js";

const NewBook = ({show}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [createBook] = useMutation(CREATE_BOOK, {
        onError: error => console.log(error),
        onCompleted: result => console.log(result),
        refetchQueries: [ALL_BOOKS, ALL_AUTHORS],
    })

    const submit = async (event) => {
        event.preventDefault()

        console.log('add book...')
        createBook({
            variables: {
                title,
                author,
                published: parseInt(published),
                genres
            }
        })

        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    if (!show) {
        return null
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({target}) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({target}) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    )
}

export default NewBook
