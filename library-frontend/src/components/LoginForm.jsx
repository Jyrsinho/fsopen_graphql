const LoginForm = ({show}) => {

    function handleLogin() {

    }

    if (!show) {
        return null
    }

    return (
        <div>
            <form>
                <div>
                    <label>name:
                        <input type="text"/>
                    </label>
                </div>
                <div>
                    <label>password
                        <input type="password"/>
                    </label>
                </div>
            </form>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}
export default LoginForm;