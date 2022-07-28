import { useState, useCallback } from 'react';
import { StyleSheet, ScrollView, TextInput, Text, View } from 'react-native'
import { Colors } from '../../constants/colors';
import { Place } from '../../model/place';
import Button from '../ui/Button';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';


function PlaceForm({onCreatePlace}) {
   const [enteredTitle, setEnteredTitle] = useState('');
   const [selectedImage, setSelectedImage] = useState();
   const [pickedLocation, setPickedLocation] = useState();
   //registering keystrokes in input
   function changeTitleHandler(enteredText){
    setEnteredTitle(enteredText);
   }

   function takeImageHandler(imageUri){
      setSelectedImage(imageUri);
   }

   const pickLocationHandler = useCallback((location) => {
      setPickedLocation(location);
   }, []);

   function savePlaceHandler(){
    console.log(enteredTitle);
    console.log(selectedImage);
    console.log(pickedLocation);
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
   }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput 
        onChangeText={changeTitleHandler}
        value={enteredTitle}
        style={styles.input}/>
      </View>
      <ImagePicker onTakeImage={takeImageHandler}/>
      <LocationPicker onPickLocation={pickLocationHandler}/>
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}
export default PlaceForm;
const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,

    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500,
    },
    input: {
        borderRadius: 6,
        backgroundColor: Colors.primary100,
        borderBottomColor: Colors.primary500,
        borderBottomWidth: 2,
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
    },
  

})