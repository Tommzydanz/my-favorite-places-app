import { useState, useEffect,  } from "react";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { View, StyleSheet, Alert, Text, Image } from "react-native";
import OutlineButton from "../ui/OutlineButton";
import { Colors } from '../../constants/colors';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from 'expo-location';
import { getAddress, getMapPreview } from '../../util/location';


function LocationPicker({onPickLocation}){
    const [pickedLocation, setPickedLocation] = useState();
    const isFocused = useIsFocused(); // will be true whenever the screen component
    // which this component (LocationPicker)
    // belongs is the main screen and false otherwise.
    // therefore this will switch false when we enter the map and,
    // true when we come back from the map

    const navigation = useNavigation();
    const route = useRoute();

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    useEffect(() => {

        if (isFocused && route.params) { 
            const mapPickedLocation = {
            lat: route.params.pickedLat,
            lng: route.params.pickedLng,
        };
        setPickedLocation(mapPickedLocation);
        } 

    }, [route, isFocused]);


    useEffect(() => {
        async function holdLocation(){
           if(pickedLocation){
            const address = await getAddress(
              pickedLocation.lat,
              pickedLocation.lng
            );
            onPickLocation({...pickedLocation, address: address});
            } 
        }
        holdLocation();
    }, [pickedLocation, onPickLocation]);
    
    

    async function verifyPermissions() {

        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if(locationPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert("Insufficient Permission!", 
            'You need to grant location permissions to use this app.'
            );
            return false;
        }
        return true;
    }



    async function getLocationHandler(){
      const hasPermission = await verifyPermissions();

      if (!hasPermission) {

        return;
      }
      const location = await getCurrentPositionAsync(); // this wont run until there are permission statuses.
    //   console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    }

    function pickOnMapHandler(){
        navigation.navigate('Map');

     }

    let locationPreview = <Text>No Location found yet.</Text>

    if(pickedLocation){
        locationPreview = <Image source={{ uri: getMapPreview(
            pickedLocation.lat,
            pickedLocation.lng
        )}}
        style={styles.image}/>
    }
    
    return <View>
        <View style={styles.mapPreview}>
            {locationPreview}
        </View>
        <View style={styles.actions}>
            <OutlineButton icon="location" onPress={getLocationHandler}>Locate User</OutlineButton>
            <OutlineButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlineButton>
        </View>
    </View>
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: Colors.primary100,
        overflow: 'hidden'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }, 
    image:{
        width: '100%',
        height: '100%',
    }
})