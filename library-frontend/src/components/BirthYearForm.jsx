import {useState} from "react";

const BirthYearForm = () => {

    let formStyle= {
        display: "flex",
        flexDirection: "column",
    }

    const [birthYear, setBirthYear] = useState("")
    const [name, setName] = useState('')

    const submit = (e) => {
        e.preventDefault()


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
            </form>
        </div>
    )
}

export default BirthYearForm