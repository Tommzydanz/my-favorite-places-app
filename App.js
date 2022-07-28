import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FavoritePlaces from './screens/FavoritePlaces';
import AddPlace from './screens/AddPlace';
import Map from './screens/Map';
import { Colors } from './constants/colors';
import IconButton from './components/ui/IconButton';
import { init } from './util/database';
import AppLoading from 'expo-app-loading';
import PlaceDetails from './screens/PlaceDetails';


const Stack = createNativeStackNavigator();


export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
      init().then(
        setDbInitialized(true)
      ).catch((err) => {
        console.log(err);
      });
    }, []) ;

    if(!dbInitialized) {
      return <AppLoading />;
    }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary800 },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="FavoritePlaces"
            component={FavoritePlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a new Place",
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              title: "Map",
            }}
          />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
            title: 'Loading Place...',
          }}/>
          
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

