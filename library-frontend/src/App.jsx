import {useState} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm.jsx";
import {useApolloClient} from "@apollo/client/react";
import {Recommendations} from "./Recommendations.jsx";

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(localStorage.getItem('library-user-token'))
    const client = useApolloClient();

    if (!token) {
        return (
            <LoginForm show={true} setToken={setToken}/>
        )
    }

    function handleLogOut() {
        setToken(null)
        localStorage.clear();
        client.resetStore()
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
                {token && <button onClick={() => setPage('recommendations')}>recommend</button>}
                {token
                    ? <button onClick={() => handleLogOut()}>logout</button>
                    : <button onClick={() => setPage('login')}>login</button> }
            </div>
            <div>
                <Authors show={page === 'authors'} token={token}/>
                <Books show={page === 'books'}/>
                <NewBook show={page === 'add'}/>
                <LoginForm show={page === 'login'} setToken={setToken}/>
                <Recommendations show={page === 'recommendations'}></Recommendations>
            </div>
        </div>
    )
}

export default App
