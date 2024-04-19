import styles from './Map.module.css'
import { useNavigate, useSearchParams } from "react-router-dom";
function ShowMap () {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()

    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    console.log(lat, lng);

    return (
        <div className={styles.mapContainer} onClick={() => navigate("form")} role='button'>
            <h1>Map</h1>
            <h1>Position: {lat} {lng}</h1>
            <button onClick={() => setSearchParams({ lat: 23, lng: 30 })}>Change Position</button>
        </div>
    )
}

export default ShowMap