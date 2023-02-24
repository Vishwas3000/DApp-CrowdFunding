// import logo from './logo.svg';
// import './App.css';
import Layout from "./components/Layout.js"
import Loader from "./pages/Loader"
import { useEffect } from "react"

import { Provider } from "react-redux"
import store from "./redux/store"
import { Auth, useAuth } from "@arcana/auth-react"
// import { auth } from './index.js';

const onLogin = () => {
    // Route to authenticated page
    return <Layout />
}

function App() {
    const auth = useAuth()

    useEffect(() => {
        // code to run on initial load
        window.onload = async () => {
            try {
                await auth.init()
                // 14983200
            } catch (e) {
                // log error
                console.log("error from arcana connection, ", e)
            }
        }
    }, [])

    return (
        <div className="App">
            <Provider store={store}>
                {auth.loading ? (
                    <Loader />
                ) : auth.isLoggedIn ? (
                    <Layout />
                ) : (
                    <div>
                        <Auth
                            externalWallet={true}
                            theme={"light"}
                            onLogin={onLogin}
                        />
                    </div>
                )}
            </Provider>
        </div>
    )
}

export default App
