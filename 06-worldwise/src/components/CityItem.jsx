import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import PropTypes from 'prop-types'
import { useCities } from '../contexts/useCity';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

function CityItem ({ cityItem }) {
    const { cityName, emoji, date, id, position } = cityItem
    const { currentCity } = useCities()

    return (
        <li>
            <Link
                className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ""}`}
                to={`${id}?lat=${position.lat}&lng=${position.lng}`}
            >
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}>x</button>
            </Link>
        </li >
    )
}

CityItem.propTypes = {
    cityItem: PropTypes.object.isRequired
}

export default CityItem