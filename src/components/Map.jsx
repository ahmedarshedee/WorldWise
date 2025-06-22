import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CititesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
function Map() {
  // ik hook ji react router deta hai yeye iss liye hai hum bagir url ko click
  // keie khi bhi ja sakte hain aur yey ik fun return karta hai
  // const navigate = useNavigate();
  const { cities } = useCities();
  // yey ik hook hai jo URL key paramaur query key glbal acccess key liye hota hai yye bikul usestaet ki trha hota hia
  // iis main vlue ko get karna hota hai iss key object main sey phir use karna hota hai
  //   iss key vatrible ki naam yrl key param key naam sey smae hoo

  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  // yey hum ney custom hook export kia hai
  const [mapLat, mapLng] = useUrlPosition();
  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition) {
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      }
    },
    [geolocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use Your Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        // center={[mapLat, mapLng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        {/* <ChangeCenter position={mapPosition} /> */}
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  // hook given by leaflet
  const map = useMap();
  // this function will change the center of the map
  map.setView(position);
  // every component need to return some jsx
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  // another leaflet hook
  useMapEvent({
    // yey link iss liye banya hai key form sey dat read kar saky aur navigate existing url
    // key sath iss link ko laga dey ga phir hum iss ko read kary gsi
    // e cureent postion jo map pey clixk ho gi wo return kare ga
    // e is event object
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
