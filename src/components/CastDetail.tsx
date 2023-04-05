import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

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

  const API_KEY = 'c2d1eba2da68e492d514141b781c25cf';
  const API_URL = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;

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
      <View style={styles.castMemberContainer}>
        <Image source={{ uri: imageURL }} resizeMode="cover" style={styles.castImage} />
        <Text style={styles.castName}>{item.name}</Text>
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

const styles = StyleSheet.create({
  castMemberContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  castImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  castName: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default CastDetail;
