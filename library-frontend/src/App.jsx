import {useState} from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm.jsx";
import {useApolloClient} from "@apollo/client/react";
import {Recommendations} from "./Recommendations.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
    const [notification, setNotification] = useState(null);
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(localStorage.getItem('library-user-token'))
    const client = useApolloClient();

    function handleLogOut() {
        setToken(null)
        localStorage.clear();
        client.resetStore()
    }

    const notify = (message) => {
        setNotification(message)
        setTimeout(() => {
            setNotification(null)
        }, 10000)
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token && <button onClick={() => setPage('add')}>add book</button>}
                {token && <button onClick={() => setPage('recommendations')}>recommend</button>}
                {token
                    ? <button onClick={() => handleLogOut()}>logout</button>
                    : <button onClick={() => setPage('login')}>login</button> }
            </div>
            <div>
                <Authors show={page === 'authors'} token={token}/>
                <Books show={page === 'books'}/>
                <NewBook show={page === 'add'}/>
                <LoginForm show={page === 'login'} setToken={setToken} notify={notify}/>
                <Recommendations show={page === 'recommendations'}></Recommendations>
                <Notification errorMessage={notification}/>
            </div>
        </div>
    )
}

export default App
