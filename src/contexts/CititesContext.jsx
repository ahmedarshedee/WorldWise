import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";
const initialState = {
  cities: [],
  isLoding: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoding: true,
      };

    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoding: false,
      };

    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
        isLoding: false,
      };

    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        // currentCity: action.payload, // agar hum currentCity ko bhi update karna chahte hain
        isLoding: false,
      };

    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {}, // agar hum currentCity ko bhi update karna chahte hain
        isLoding: false,
      };

    case "rejected":
      return {
        ...state,
        isLoding: false,
        error: action.payload,
      };

    default:
      throw new Error(`Unkonwn action type`);
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoding, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoding, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Failed to fetch cities",
        });
      }
    }
    fetchCities();
  }, []);
  const getCity = useCallback(
    async function getCity(id) {
      if (currentCity.id === Number(id)) return; // agar currentCity main id already hai to kuch na karo
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Failed to fetch city",
        });
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // adding new cities to existing cities list to render
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Failed to create city",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "POST",
      });
      // adding new cities to existing cities list to render
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Failed to delete city",
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoding,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
// CUSTOM HOOK:
function useCities() {
  const context = useContext(CitiesContext);
  // USE SRIF ISS PROVIDER COMPNENT KEY ANDAR USE HOO GA BHRHOO GA TU ERROR AA GAY GA
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}
export { CitiesProvider, useCities };
