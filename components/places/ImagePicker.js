import { useState } from "react";
import { Alert, Text, Image, View, StyleSheet } from "react-native";
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from 'expo-image-picker'
import { Colors } from "../../constants/colors";
import OutlineButton from "../ui/OutlineButton";


function ImagePicker({onTakeImage}){
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [pickedImage, setPickedImage] = useState();

    async function verifyPermissions() {
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert("Insufficient Permission!", 
            'You need to grant camera permission to use this app.'
            );
            return false;
        }
        return true;
    }

    async function takeImageHandler(){
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
           allowsEditing: true,
           aspect: [16,9],
           quality: 0.5,
        });
        setPickedImage(image.uri);
        onTakeImage(image.uri);
    }
    
    let imagePreview = <Text>No Image taken yet.</Text>

    if(pickedImage) {
        imagePreview = <Image source={{ uri: pickedImage}} style={styles.image} />;
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlineButton icon='camera' onPress={takeImageHandler}>Take Image</OutlineButton>
        </View>
     );
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: Colors.primary100,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    }
})