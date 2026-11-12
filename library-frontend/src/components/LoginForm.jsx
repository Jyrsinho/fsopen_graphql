import {useMutation} from "@apollo/client/react";
import {LOGIN} from "../graphql/mutations.js";
import {useState} from "react";

const LoginForm = ({show, setToken, notify, setPage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const [login] = useMutation(LOGIN, {
        onCompleted: (data) => {
            const token = data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
            setPage('authors')
            console.log('login completed')
        },
        onError: (error) => {
            console.log('Failure logging in')
            notify(error.message)
            console.log(error.message)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        login({variables: {username, password,}})
    }

    if (!show) {
        return null
    }

    return (
        <div>
            <h3>login:</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>username:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>password
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                </div>
                <button type={"submit"}>login</button>
            </form>
        </div>
    )
}
export default LoginForm;