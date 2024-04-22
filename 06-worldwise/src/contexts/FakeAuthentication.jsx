import { createContext, useContext, useReducer } from "react";
import PropTypes from 'prop-types'



const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "admin",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext()

const initialValues = {
    isAuthenticated: false,
    user: null
}

function reducer (state, action) {
    switch (action.type) {
        case "login":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case "logout":
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        default:
            return new Error("Unknown action")
    }
}

function AuthContextProvider ({ children }) {

    // const [isAuthenticated, setIsAuthenticated] = 
    const [{ isAuthenticated, user }, dispatch] = useReducer(reducer, initialValues)

    function login (email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: "login", payload: FAKE_USER })
        }
    }

    function logout () {
        dispatch({ type: "logout" })
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}


function useAuth () {
    const context = useContext(AuthContext)
    if (context === undefined) throw new Error("AuthContext was used outside the AuthContextProvider")
    return context
}

export { AuthContextProvider, useAuth }