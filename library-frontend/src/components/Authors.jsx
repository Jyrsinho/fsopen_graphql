import {ALL_AUTHORS } from "../graphql/queries.js";
import {useQuery} from "@apollo/client/react";
import BirthYearForm from "./BirthYearForm.jsx";

const Authors = ({show }) => {

    const authorResult = useQuery(ALL_AUTHORS)
    console.log('fetched authors')

    if (!show) {
        return null
    }

    if (authorResult.loading ) {
        return (
            <div>
                ...loading
            </div>
        )
    }

    const authors = authorResult.data.allAuthors

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>born</th>
                    <th>books</th>
                </tr>
                {authors.map((a) => (
                    <tr key={a.id}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <td>{a.bookCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <BirthYearForm authors={authors} />
        </div>
    )
}

export default Authors
