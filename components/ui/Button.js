import { StyleSheet, Text, Pressable, Dimensions} from 'react-native'
import React from 'react'
import { Colors } from '../../constants/colors';
 function Button({children, onPress}) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

export default Button;

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7
    },
    button: {
        paddingVertical: 8, 
        paddingHorizontal: 12,
        marginTop: deviceHeight > 700 ? 48: 4,
        backgroundColor: Colors.primary800,
        elevation: 4,
        shadowColor: Colors.gray700,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 4,
        shadowOpacity: 0.25,
        borderRadius: 4,
        

    },
    text: {
        fontSize: 18, 
        textAlign: 'center', 
        color: 'white'
    },
})