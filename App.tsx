import { AppNavigator } from "./src/config/app.navigator";
import { SafeAreaView } from "react-native";
import React, { useEffect } from 'react';
import * as Font from 'expo-font';
import { ContextProvider } from './src/config/Context';


/* Esta es la página principal de la app */
export default function App() {

  /* Esta función carga las fuentes de la app */
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


