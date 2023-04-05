// Inicia MovieList.tsx
import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import PropTypes from "prop-types";
import PremieredMovies from "../components/PemieredMovies";
import PopularMovies from "../components/PopularMovies";
import ToggleButton from "../components/ToggleButton";
import { Context } from "../config/Context";
import { theme } from "../config/theme";

const MovieList = (props: any) => {
  const { themeMode } = useContext(Context);

  return (
    <SafeAreaView style={styles.container}>
      <PremieredMovies />
      <PopularMovies />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  darkContainer: {
    backgroundColor: theme.colors.dark.background,
    alignItems: "center",
    flex: 1,
  },
  lightContainer: {
    backgroundColor: theme.colors.light.background,
    alignItems: "center",
    flex: 1,
  },
  darkTitle: {
    color: theme.colors.dark.primary,
    fontSize: 50,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
  },
  lightTitle: {
    color: theme.colors.light.primary,
    fontSize: 50,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
  },
});

MovieList.propTypes = {};

export default MovieList;

// Termina MovieList . Path: src\pages\MovieList.tsx
