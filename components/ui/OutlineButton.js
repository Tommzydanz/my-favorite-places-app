import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

function OutlineButton ({children, icon, onPress}) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed && styles.pressed]}>
        <Ionicons name={icon} size={18} color={Colors.primary500} />
        <Text style={styles.title}>{children}</Text>
    </Pressable>
  );
}

export default OutlineButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  button: {
    margin: 4,
    paddingVertical: 6,
    paddingHorizontal:12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  icon:{
    marginRight: 6
  },
  title: {
    fontSize: 18,
    color: Colors.primary500

  }


})