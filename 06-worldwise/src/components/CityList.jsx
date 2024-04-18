import CityItem from './CityItem'
import styles from './CityList.module.css'
import Spinner from "./Spinner"
import Message from "./Message"
import PropTypes from 'prop-types'


function CityList ({ cities, isLoading }) {
    if (isLoading) return <Spinner />
    if (!cities.length) return <Message message="Hello add tour first city, by clicking on Map" />
    return (
        <ul className={styles.cityList}>
            {cities.map(city => <CityItem key={city.id} cityItem={city} />)}
        </ul>
    )
}

CityList.propTypes = {
    cities: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
}

export default CityList