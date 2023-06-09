import React, { useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { View } from 'react-native';
import { Context } from './Context';

import MovieList from '../pages/MovieList.tsx';
import MovieDetails from '../pages/MovieDetails.tsx';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { theme, lightMode } = React.useContext(Context);

  return (
    <NavigationContainer>
      <View style={{ marginBottom: Constants.statusBarHeight }}>
        <StatusBar
          style={lightMode ? "dark" : "light"}
          backgroundColor={theme.backgroundColor}
        />
      </View>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MovieList" component={MovieList} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Path: src\config\app.navigator.tsx