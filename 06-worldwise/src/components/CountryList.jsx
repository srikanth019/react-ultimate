import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Spinner from "./Spinner"
import Message from "./Message"
import PropTypes from 'prop-types'


function CountryList ({ cities, isLoading }) {
    if (isLoading) return <Spinner />
    if (!cities.length) return <Message message="Hello add tour first city, by clicking on Map" />

    const countries = cities.reduce((arr, city) => {
        if (!arr.map(el => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }]
        else return arr

    }, [])

    return (
        <ul className={styles.countryList}>
            {countries.map(country => <CountryItem key={country.id} country={country} />)}
        </ul>
    )
}

CountryList.propTypes = {
    cities: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
}

export default CountryList