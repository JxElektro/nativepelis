import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import { theme } from './src/config/theme';
import { useState } from 'react';
import MovieList from './src/pages/MovieList';


export default function App() {
  const [themeMode, setThemeMode] = useState('dark');

  const toggleTheme = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  };

  const currentStyles = styles(themeMode);

  return (
    <View style={currentStyles.container}>
      <StatusBar style="auto" />
      <MovieList />
    
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