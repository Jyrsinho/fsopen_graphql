import {useQuery} from "@apollo/client/react";
import {ALL_BOOKS} from "../graphql/queries.js";
import {useState} from "react";

const selectedStyle = {
    border: "2px solid black",
}

const notSelectedStyle = {
    border: "1px solid black",
}

const Books = ({show}) => {
    const genres = ['horror', 'programming', 'comedy']
    const [selectedGenres, setSelectedGenres] = useState([]);
    console.log('selectedGenres: ', selectedGenres)

    const bookResult = useQuery(ALL_BOOKS, {
        variables: {
            genres: selectedGenres.length > 0 ? selectedGenres : undefined,
        },
        onError: err => {
            console.log(err)
        }
    })

    const toggleSelectedGenres = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(genre => genre !== genre))
        }else {
            setSelectedGenres([...selectedGenres, genre])
        }

    }

    if (!show) {
        return null
    }

    if (bookResult.loading) {
        return (
            <div>
                ...loading
            </div>
        )
    }

    const books = bookResult.data.allBooks

    return (
        <div>
            <h2>books</h2>
            <h3>select genres:</h3>
            {genres.map(genre => (
                <button key={genre}
                        onClick={() => toggleSelectedGenres(genre)}
                        style={ selectedGenres.includes(genre) ? selectedStyle : notSelectedStyle }
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
