import { StyleSheet, Text, View, Image, Pressable} from 'react-native'
import { Colors } from '../../constants/colors';


function PlaceItem({ place, onSelect }) {

  return (
    <Pressable onPress={onSelect.bind(this, place.id)} style={({pressed}) => [styles.item, pressed && styles.pressed]} >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.place}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.9,
  },
  item: {
    marginTop: 12,
    borderRadius: 8,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.15
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  },
  place: {
    flex: 2,
    padding: 18, 
    backgroundColor: Colors.primary800,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  address: {
    color: 'white',
    fontSize: 14,
    fontStyle: 'italic',
  }
})