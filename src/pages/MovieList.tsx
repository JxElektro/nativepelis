
import React, { useContext } from "react";
import { StyleSheet, SafeAreaView} from "react-native";
import PremieredMovies from "../components/PemieredMovies";
import PopularMovies from "../components/PopularMovies";



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

