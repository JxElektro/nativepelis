import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { View } from 'react-native';

import MovieList from '../pages/MovieList.tsx';
import MovieDetails from '../pages/MovieDetails.tsx';

const Stack = createStackNavigator();

export const AppNavigator = () => {

  return (
    <NavigationContainer >
      <View style={{ marginBottom: Constants.statusBarHeight }}>
        <StatusBar
          style="light"
          backgroundColor='#0E2859'
        />
      </View>
      <Stack.Navigator screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="MovieList" component={MovieList} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Path: src\page\MovieList.js


