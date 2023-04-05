import React, { useContext } from 'react'
import { View  , Text , StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import PremieredMovies from '../components/PemieredMovies'
import PopularMovies from '../components/PopularMovies'
import ToggleButton from '../components/ToggleButton'
import { Context } from '../config/Context'
import { theme } from '../config/theme'

const MovieList = (props: any) => {
  const { themeMode } = useContext(Context);

  

  return (
    <View style={ themeMode === "dark" ? styles.darkContainer : styles.lightContainer}>
      <Text style={ themeMode === "dark" ? styles.darkContainer : styles.lightContainer} >MovieList</Text>
      <PremieredMovies />
      <PopularMovies />
      <ToggleButton />
    </View>
  );
};

const styles = StyleSheet.create({
  darkContainer : {
    backgroundColor : theme.colors.dark.background,
    alignItems : "center",
    color : theme.colors.dark.primary,
    fontFamily : "Roboto",
    fontSize : 50,
    fontWeight : "bold",
    paddingTop : 50,
    paddingBottom : 50,
    flex : 1,
  },
  lightContainer : {
    backgroundColor : theme.colors.light.background,
    alignItems : "center",
    color : theme.colors.light.primary,
    fontFamily : "Roboto",
    fontSize : 50,
    fontWeight : "bold",
    paddingTop : 50,
    paddingBottom : 50,
    flex : 1,
  },}
)
    


MovieList.propTypes = {};

export default MovieList;

// Path: src\pages\MovieList.tsx