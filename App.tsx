import React from "react";
import { AppNavigator } from "./src/config/app.navigator";
import { ContextProvider } from "./src/config/Context";
import { SafeAreaView , Text} from "react-native";

export default function App() {
  return (
    <ContextProvider >
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </ContextProvider>
  );
}
//Path: App.tsx
