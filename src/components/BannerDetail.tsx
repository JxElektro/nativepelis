// BannerDetail.tsx
import React from 'react';
import { View, Text } from 'react-native';

interface BannerDetailProps {
  movieId: number;
}

const BannerDetail = (props: BannerDetailProps) => {
  const { movieId } = props;

  return (
    <View>
      <Text>BannerDetail for Movie ID: {movieId}</Text>
    </View>
  );
};

export default BannerDetail;
