import {useState} from "react";
import {useMutation } from "@apollo/client/react";
import {EDIT_AUTHOR} from "../graphql/mutations.js";
import {ALL_AUTHORS} from "../graphql/queries.js";

const BirthYearForm = () => {

    let formStyle= {
        display: "flex",
        flexDirection: "column",
    }

    const [birthYear, setBirthYear] = useState("")
    const [name, setName] = useState('')

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{query: ALL_AUTHORS}],
        onError: (err) => {console.log(err)},
    })

    const submit = (e) => {
        e.preventDefault()

        editAuthor({
            variables: {
                name,
                setBornTo: parseInt(birthYear)
            }
        })

        //Cleanup
        setName("")
        setBirthYear("")
    }


    return (
        <div>
            <h3>edit birthyear</h3>
            <form style={formStyle} onSubmit={(e) => submit(e)}>
                <label>name
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label>birth year
                    <input type={"text"} value={birthYear} onChange={(e) => setBirthYear(e.target.value)}/>
                </label>
                <button type={"submit"}>update author</button>
            </form>
        </div>
    )
}

export default BirthYearForm