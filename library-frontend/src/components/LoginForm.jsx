import {useMutation} from "@apollo/client/react";
import {LOGIN} from "../graphql/mutations.js";
import {useState} from "react";

const LoginForm = ({show, setToken}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const [login] = useMutation(LOGIN, {
        onCompleted: (data) => {
            const token = data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        },
        onError: (error) => {
        }
    })

    function handleSubmit() {
        try {
            login({
                variables: {
                    username,
                    password,
                }
            })
        }catch (error) {
        }
    }

    if (!show) {
        return null
    }

    return (
        <div>
            <h3>login:</h3>
            <form>
                <div>
                    <label>name:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>password
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                </div>
            </form>
            <button onClick={handleSubmit}>Login</button>
        </div>
    )
}
export default LoginForm;