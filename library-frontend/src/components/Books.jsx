import {useQuery} from "@apollo/client/react";
import {ALL_BOOKS} from "../graphql/queries.js";

const Books = ({show }) => {

    const bookResult = useQuery(ALL_BOOKS)
    console.log('fetched books')
    console.log('bookResult', bookResult)

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
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {books.map((a) => (
                    <tr key={a.id}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Books
