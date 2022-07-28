import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { fetchPlaces } from "../util/database";

function FavoritePlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();
  
 useEffect(() => {

    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }


    if(isFocused) {
      loadPlaces();
      //  setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]);
    }
    }, [isFocused]);
    
  return (
    <PlacesList places={loadedPlaces}/>
  )
}
export default  FavoritePlaces;
