import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Context } from "../config/Context";

interface ToggleButtonProps {
  style?: StyleProp<ViewStyle>;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ style }) => {
  const { lightMode, setLightMode } = useContext(Context);

  const toggleTheme = () => {
    setLightMode(!lightMode);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={toggleTheme}
      >
        <Text>{lightMode ? "🌙" : "☀️"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    backgroundColor: "#fff", 
  }
});

export default ToggleButton;

// Path: src\components\ToggleButton.tsx
