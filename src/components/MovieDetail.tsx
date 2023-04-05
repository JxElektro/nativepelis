import React from 'react'
import { View , Text} from 'react-native'


interface MovieDetailsProps {
movieId: number;
}

const MovieDetails = (props: MovieDetailsProps) => {

  const { movieId } = props;

  return (
    <View>
      <Text>MovieDetail {movieId}</Text>
    </View>
  )
}


export default MovieDetails