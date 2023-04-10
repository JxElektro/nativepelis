import React, { useContext } from "react";
import { StyleSheet, SafeAreaView} from "react-native";
import PremieredMovies from "../components/PremieredMovies";
import PopularMovies from "../components/PopularMovies";


/* este es el componente principal que contiene los componentes de las peliculas populares y las peliculas estrenadas */
const MovieList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PremieredMovies />
      <PopularMovies />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


MovieList.propTypes = {};

export default MovieList;

// Path: src\pages\MovieList.tsx