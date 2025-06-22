import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import Cityitem from "./Cityitem";
import Message from "./Message";
import { useCities } from "../contexts/CititesContext";
function CityList() {
  const { cities, isLoding } = useCities();
  console.log("cities:", cities);

  if (isLoding) return <Spinner />;
  if (!cities.length) return <Message message="dd your first city via map" />;
  return (
    <ul className={styles.cityList}>
      {Array.isArray(cities) &&
        cities.map((city) => <Cityitem city={city} key={city.id} />)}
    </ul>
  );
}

export default CityList;
