import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import { theme } from './src/config/theme';
import test from './src/components/test';
import { useState } from 'react';


export default function App() {
  const [themeMode, setThemeMode] = useState('dark');

  const toggleTheme = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  };

  const currentStyles = styles(themeMode);

  return (
    <View style={currentStyles.container}>
      <StatusBar style="auto" />
      <Text>Open up App.tsx to start working on your app! {themeMode}</Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Text>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = (themeMode: string) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeMode === 'dark' ? theme.colors.dark.background : theme.colors.light.background,
    
  },
});
// Path: src\config\theme.ts