import styles from "./City.module.css";

import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CititesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

// useparam ik hook hi jo route ket path key jo aggay id likhi hoti hai wo return karta hai
// path="cities/:id" iss main jo id likhi hai wo return hoti hai use hum destructure karte hain
// phir uss ko hum use karty hai
function City() {
  //   const [searchparam, setSearchparam] = useSearchParams();
  // useSearch Params is a hook that returns the current URL's search parameters like stuff in url after ?

  let { id } = useParams();
  const { getCity, currentCity, isloding } = useCities();
  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  // };

  const { cityName, emoji, date, notes } = currentCity;
  if (isloding) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
