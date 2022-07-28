import { useState, useLayoutEffect, useCallback } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/ui/IconButton';
import MapView, {Marker} from 'react-native-maps';



 function Map({navigation, route }) {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region ={
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event){
    if(initialLocation){
      return;
    }
    //console.log(event);// to learn it structure if you wanted to.
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({lat: lat, lng: lng});
  }

  const savePickedLocationHandler = useCallback (() => {
    if(!selectedLocation){
      Alert.alert(
        "Please select location",
        "You have to pick a location (by tapping on the map) first!"
      );
      
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });

  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if ( initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  
  }, [navigation, savePickedLocationHandler, initialLocation]);
   

  return (
    
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {/* // a marker gets added while we tap the map */}
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
})