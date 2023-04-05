import React from 'react';
import { View, Text } from 'react-native';

interface CastDetailProps {
  movieId: number;
}

const CastDetail = (props: CastDetailProps) => {
  const { movieId } = props;

  return (
    <View>
      <Text>CastDetail for Movie ID: {movieId}</Text>
    </View>
  );
};

export default CastDetail;
