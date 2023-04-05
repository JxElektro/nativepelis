// Theme Toggle Button

import React, { useContext } from "react";
import { View, Text, TouchableOpacity , StyleSheet} from "react-native";
import { Context } from "../config/Context";


const ToggleButton = (props : any ) => {
  const { themeMode, setThemeMode } = useContext(Context);

  const toggleTheme = () => {
    if (themeMode === "dark") {
      setThemeMode("light");
    } else {
      setThemeMode("dark");
    }
  };


  return (
    <View >
      <TouchableOpacity style={styles.container} onPress={toggleTheme}>
        <Text style={styles.text}>Cambiar Color</Text>
      </TouchableOpacity>
    </View>
  );
};

// styled like a button

const styles = StyleSheet.create({
  container : {
    backgroundColor : "#000",
    padding : 10,
    borderRadius : 5,
    margin : 10,
    width : 150,
    alignItems : "center",
  },
  text: {
    color: "#fff",
  },
})

export default ToggleButton;

// Path: src\components\ToggleButton.tsx