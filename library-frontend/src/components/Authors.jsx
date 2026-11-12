import BirthYearForm from "./BirthYearForm.jsx";
import {useQuery} from "@apollo/client/react";
import {ALL_AUTHORS} from "../graphql/queries.js";

const Authors = ({show}) => {

    const authorResult = useQuery(ALL_AUTHORS)

    if (authorResult.loading) {
        return (
            <div>
                ...loading
            </div>
        )
    }
    if (!show) {
        return null
    }

    const authors = authorResult.data.allAuthors

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                <tr>
                    <th>name</th>
                    <th>born</th>
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
            <BirthYearForm authors={authors}/>
        </div>
    )
}

export default Authors
