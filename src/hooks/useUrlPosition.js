import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchparam] = useSearchParams();

  //   const [searchparam] = useSearchParams();
  const lat = searchparam.get("lat");
  const lng = searchparam.get("lng");
  return [lat, lng];
}
