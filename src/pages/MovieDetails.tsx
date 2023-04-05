import React from 'react'
import { View , Text } from 'react-native'
import BannerDetail from '../components/BannerDetail'
import MovieDetail from '../components/MovieDetail'
import CastDetail from '../components/CastDetail'

const MovieDetails = ({ route }: any) => {
  const { movieId } = route.params;

  return (
    <View>
      <BannerDetail movieId={movieId} />
      <MovieDetail movieId={movieId} />
      <CastDetail movieId={movieId} />
    </View>
  )
}

MovieDetails.propTypes = {}

export default MovieDetails