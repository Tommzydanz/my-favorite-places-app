import { StyleSheet, Text, View } from 'react-native'
import PlaceForm from '../components/places/PlaceForm';
import { insertPlace } from '../util/database';


 function AddPlace({ navigation }) {

  async function createPlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate('FavoritePlaces');
  }
  return (
      <PlaceForm onCreatePlace={createPlaceHandler}/>
  )
}

export default AddPlace;