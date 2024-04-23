import { useEffect, useMemo, createContext, useReducer, useCallback } from "react";
import PropTypes from 'prop-types'

// #1 Create a Context
const CitiesContext = createContext()

//#2 Export Context Provider
const BASE_URL = "http://localhost:5000";


const initialState = {
    cities: [],
    currentCity: null,
    isLoading: false,
    error: null
}

function reducer (state, action) {
    switch (action.type) {
        case "loading":
            return {
                ...state,
                isLoading: true
            }
        case "cities/loaded":
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            }
        case "city/created":
            return {
                ...state,
                cities: [...state.cities, action.payload],
                isLoading: false,
                currentCity: action.payload
            }
        case "city/loaded":
            return {
                ...state,
                currentCity: action.payload,
                isLoading: false
            }
        case "city/deleted":
            return {
                ...state,
                cities: state.cities.filter(city => city.id !== action.payload),
                isLoading: false,
                currentCity: null
            }

        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return new Error("Unknown action")
    }
}

function CityContextProvider ({ children }) {
    // const [cities, setCities] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [currentCity, setCurrentCity] = useState({})
    const [{ cities, currentCity, isLoading }, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({ type: "loading" })
        async function fetchCities () {
            try {
                const res = await fetch(`${BASE_URL}/cities`)
                const data = await res.json()
                dispatch({ type: "cities/loaded", payload: data })
            } catch (error) {
                dispatch({ type: "cities/error", payload: "There was an error loading data.." })
                alert(error.message)
            }
        }
        fetchCities()
    }, [])

    const getCity = useCallback(async function getCity (id) {
        if (id == currentCity?.id) return
        dispatch({ type: "loading" })
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json()
            dispatch({ type: "city/loaded", payload: data })
        } catch (error) {
            dispatch({ type: "city/error", payload: "There was an error loading city data.." })
            alert(error.message)
        }
    }, [currentCity?.id])

    async function createCity (newCity) {
        try {
            dispatch({ type: "loading" })
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCity)
            })
            const data = await res.json()
            dispatch({ type: "city/created", payload: data })
        } catch (error) {
            dispatch({ type: "city/error", payload: "There was an error creating city data.." })
            alert(error.message)
        }
    }

    async function deleteCity (id) {
        try {
            dispatch({ type: "loading" })

            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE'
            })
            dispatch({ type: "city/deleted", payload: id })
        } catch (error) {
            dispatch({ type: "city/error", payload: "There was an error deleting city data.." })
            alert(error.message)
        }
    }

    const contextValue = useMemo(() => ({ cities, isLoading, currentCity, getCity, createCity, deleteCity }),
        [cities, isLoading, currentCity, getCity]
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
