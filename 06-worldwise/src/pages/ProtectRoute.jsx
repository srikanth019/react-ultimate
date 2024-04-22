import { useEffect } from "react"
import { useAuth } from "../contexts/FakeAuthentication"
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'


function ProtectRoute ({ children }) {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
        }
    }, [isAuthenticated, navigate])

    return isAuthenticated ? children : null
}
ProtectRoute.propTypes = {
    children: PropTypes.node.isRequired
}

export default ProtectRoute
