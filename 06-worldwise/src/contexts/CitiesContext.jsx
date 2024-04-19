import { useEffect, useState, useMemo, createContext } from "react";
import PropTypes from 'prop-types'

// #1 Create a Context
const CitiesContext = createContext()

//#2 Export Context Provider
const BASE_URL = "http://localhost:5000"

function CityContextProvider ({ children }) {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentCity, setCurrentCity] = useState({})

    useEffect(() => {
        async function fetchCities () {
            try {
                setIsLoading(true)
                const res = await fetch(`${BASE_URL}/cities`)
                const data = await res.json()
                setCities(data)
            } catch (error) {
                console.log(error);
                alert(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCities()
    }, [])

    async function getCity (id) {
        try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json()
            setCurrentCity(data)
        } catch (error) {
            alert(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const contextValue = useMemo(() => ({ cities, isLoading, currentCity, getCity }),
        [cities, isLoading, currentCity]
    );

    return (
        <CitiesContext.Provider value={contextValue}>
            {children}
        </CitiesContext.Provider>
    )
}

CityContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export { CityContextProvider, CitiesContext }
