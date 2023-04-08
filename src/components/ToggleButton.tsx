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
    <View style={style}>
      <TouchableOpacity onPress={toggleTheme}>
        <Text>{lightMode ? "🌙" : "☀️"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToggleButton;