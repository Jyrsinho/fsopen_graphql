import {useQuery} from "@apollo/client/react";
import {ALL_BOOKS} from "../graphql/queries.js";
import {useState} from "react";

const Books = ({show}) => {
    const genres = ['horror', 'programming', 'comedy']
    const [selectedGenre, setSelectedGenre] = useState(null);

    const bookResult = useQuery(ALL_BOOKS, {
        variables: {
            genre: selectedGenre
        },
        onError: err => {
            console.log(err)
        }
    })

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
                        onClick={() => setSelectedGenre(genre)}
                        style={{
                            color: selectedGenre === genre ? 'red' : 'green'
                        }}
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
