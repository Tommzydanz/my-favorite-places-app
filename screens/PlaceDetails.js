import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import OutlineButton from '../components/ui/OutlineButton';
import { Colors } from '../constants/colors';
import { fetchPlaceDetails } from '../util/database';


function PlaceDetails ({route, navigation}){
  const [fetchedPlace, setFetchedPlace] = useState();
  function showOnMapHandler(){
    navigation.navigate('Map', {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    })
  }

  const selectedPlaceId = route.params.placeId


  // we do navigation.setOptions here this in useEfffect because we can set it while transistion to this screen anyways
  useEffect(() => {
    async function loadPlaceData(){
      const place  = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      })
    }

    loadPlaceData();
    // use selectedPlaceId to fetch data for a single place
  }, [selectedPlaceId])


  if(!fetchedPlace){
    return <View style={styles.fallbackStyle}> 
    <Text>Loading Place Data...</Text>
    </View>
  }


  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: fetchedPlace.imageUri}} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlineButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallbackStyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});