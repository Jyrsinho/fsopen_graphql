import {useQuery} from "@apollo/client/react";
import {ALL_BOOKS} from "../graphql/queries.js";
import {useState} from "react";

const Books = ({show}) => {
    const [filter, setFilter] = useState('')
    const bookResult = useQuery(ALL_BOOKS)

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


    const books = (filter.length > 1)
        ? bookResult.data.allBooks.filter( book => {
            const genres = book.genres
            const includesFilter = (element) => element.includes(filter)
            return genres.some(includesFilter)
        })
        : bookResult.data.allBooks

    return (
        <div>
            <h2>books</h2>
            <label>filter books by genre:
                <input type={'text'} value={filter} onChange={(e) => setFilter(e.target.value)} />
            </label>
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
