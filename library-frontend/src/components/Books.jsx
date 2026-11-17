import {useQuery} from "@apollo/client/react";
import {ALL_BOOKS, ALL_GENRES} from "../graphql/queries.js";
import {useState} from "react";

const selectedStyle = {
    border: "2px solid black",
}

const notSelectedStyle = {
    border: "1px solid black",
}

const Books = ({show }) => {
    const [selectedGenre, setSelectedGenre] = useState(null);

    const genresResult = useQuery(ALL_GENRES, {
        skip: !show,
        onError: (err) => {
            console.log('failed to fetch all the genres')
            console.log(err)
        }
    })

    const bookResult = useQuery(ALL_BOOKS, {
        skip: !show,
        variables: {
            genre: selectedGenre ?? undefined,
        },
        onError: err => {
            console.log(err)
        }
    })

    const chooseSelectedGenre = (selectedGenre) => {
        if (selectedGenre === "all genres") {
            setSelectedGenre(null)
            return
        }
        setSelectedGenre(selectedGenre)
    }

    if (!show) {
        return null
    }

    if (bookResult.loading || genresResult.loading) {
        return (
            <div>
                ...loading
            </div>
        )
    }

    const books = bookResult.data.allBooks
    const genres = [...genresResult.data.allGenres, "all genres"]

    return (
        <div>
            <h2>books</h2>
            <h3>in genre:</h3>
            {genres.map(genre => (
                <button key={genre}
                        onClick={() => chooseSelectedGenre(genre)}
                        style={ (selectedGenre === genre) ? selectedStyle : notSelectedStyle }
                >{genre}</button>
            ))}
            <table>
                <tbody>
                <tr>
                    <th>title</th>
                    <th>author</th>
                    <th>published</th>
                    <th>genres</th>
                </tr>
                {books.map((a) => (
                    <tr key={a.id}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                        <td>{a.genres.join()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Books
