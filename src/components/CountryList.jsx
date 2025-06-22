import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CititesContext";
function CountryList() {
  const { cities, isLoding } = useCities();

  console.log("cities:", cities);

  if (isLoding) return <Spinner />;
  if (!cities.length) return <Message message="Add your first city via map" />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((country) => country.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
