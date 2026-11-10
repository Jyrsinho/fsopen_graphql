import {useState} from "react";
import {useMutation} from "@apollo/client/react";
import {EDIT_AUTHOR} from "../graphql/mutations.js";
import {ALL_AUTHORS} from "../graphql/queries.js";

const BirthYearForm = ({authors}) => {
    let formStyle = {
        display: "flex",
        flexDirection: "column",
    }

    const [birthYear, setBirthYear] = useState(2000)
    const [name, setName] = useState(authors[0].name)

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{query: ALL_AUTHORS}],
        onError: (err) => {
            console.log(err)
        },
    })

    const submit = (e) => {
        e.preventDefault()
        console.log('name', name)

        editAuthor({
            variables: {
                name,
                setBornTo: parseInt(birthYear)
            }
        })
    }

    if (!authors.length) return null

    return (
        <div>
            <h3>edit birthyear</h3>
            <form style={formStyle} onSubmit={(e) => submit(e)}>
                <select value={name} onChange={(e => setName(e.target.value))} name={"name"} id={"name-select"}>
                    {authors.map(author => (<option key={author.id} value={author.name}>{author.name}</option>))}
                </select>
                <label>birth year
                    <input type={"number"} value={birthYear} onChange={(e) => setBirthYear(e.target.value)}/>
                </label>
                <button type={"submit"}>update author</button>
            </form>
        </div>

    )
}

export default BirthYearForm