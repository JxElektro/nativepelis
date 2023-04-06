import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { API_TOKEN } from '@env';
import tw from 'tailwind-react-native-classnames';

interface CastDetailProps {
  movieId: number;
}

interface CastMember {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

const CastDetail = (props: CastDetailProps) => {
  const { movieId } = props;
  const [cast, setCast] = useState<CastMember[]>([]);

  const API_URL = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_TOKEN}&language=en-US`;

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setCast(data.cast);
      })
      .catch((error) => {
        console.error('Error fetching cast details:', error);
      });
  }, [movieId]);

  const renderItem = ({ item }: { item: CastMember }) => {
    const imageURL = item.profile_path
      ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
      : 'https://via.placeholder.com/150';

    return (
      <View style={tw`items-center mr-4 ml-4`}>
        <Image source={{ uri: imageURL }} resizeMode="cover" style={tw`w-24 h-36 rounded-lg `} />
        <Text style={tw`text-base text-center mt-1`}>{item.name}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={cast}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal={true}
    />
  );
};

export default CastDetail;
