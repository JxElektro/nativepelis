import { AppNavigator } from "./src/config/app.navigator";
import { ContextProvider } from "./src/config/Context";
import { SafeAreaView } from "react-native";
import 'tailwind-react-native-classnames';


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
