import { AppNavigator } from "./src/config/app.navigator";
import { ContextProvider } from "./src/config/Context";
import { SafeAreaView } from "react-native";
import 'tailwind-react-native-classnames';
import React, { useEffect } from 'react';
import * as Font from 'expo-font';

export default function App() {

  const fetchFonts = async () => {
    await Font.loadAsync({
      'poppins-regular': require('./assets/Poppins-Regular.ttf'),
      'poppins-bold': require('./assets/Poppins-Bold.ttf'),
    });
  };

  useEffect(() => {
    fetchFonts();
  }, []);

  return (
    <ContextProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </ContextProvider>
  );
}

