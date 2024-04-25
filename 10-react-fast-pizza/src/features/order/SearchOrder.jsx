import { useState } from "react"
import { Form, useNavigate } from "react-router-dom"

function SearchOrder () {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    function handleSubmit (e) {
        e.preventDefault()
        if (!query) {
            return
        }
        navigate(`/order/${query}`)
    }
    return <Form onSubmit={handleSubmit}>
        <input
            type="text"
            value={query}
            placeholder="Search Order #"
            onChange={(e) => setQuery(e.target.value)}
        >
        </input>
    </Form>
}

export default SearchOrder
