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

    async function createCity (newCity) {
        try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCity)
            })
            const data = await res.json()
            setCities((cities) => [...cities, data])
        } catch (error) {
            alert(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    async function deleteCity (id) {
        try {
            setIsLoading(true)
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE'
            })
            setCities((cities) => cities.filter((city) => city.id !== id))
        } catch (error) {
            alert(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const contextValue = useMemo(() => ({ cities, isLoading, currentCity, getCity, createCity, deleteCity }),
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
