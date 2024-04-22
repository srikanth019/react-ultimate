// import styles from './Map.module.css'
// import { useNavigate, useSearchParams } from "react-router-dom";
// function ShowMap () {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const navigate = useNavigate()

//     const lat = searchParams.get('lat');
//     const lng = searchParams.get('lng');
//     console.log(lat, lng);

//     return (
//         <div className={styles.mapContainer} onClick={() => navigate("form")} role='button'>
//             <h1>Map</h1>
//             <h1>Position: {lat} {lng}</h1>
//             <button onClick={() => setSearchParams({ lat: 23, lng: 30 })}>Change Position</button>
//         </div>
//     )
// }

// export default ShowMap

import { useNavigate } from "react-router-dom";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";
import { useCities } from "../contexts/useCity";
import PropTypes from 'prop-types'


function Map () {
    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation();
    const [mapLat, mapLng] = useUrlPosition();

    useEffect(
        function () {
            if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
        },
        [mapLat, mapLng]
    );

    useEffect(
        function () {
            if (geolocationPosition)
                setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
        },
        [geolocationPosition]
    );

    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && (
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? "Loading..." : "Use your position"}
                </Button>
            )}

            <MapContainer
                center={mapPosition}
                zoom={10}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}

                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeCenter ({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

ChangeCenter.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
}


function DetectClick () {
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
}

export default Map;