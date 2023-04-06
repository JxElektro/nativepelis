import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image , StyleSheet} from 'react-native';
import { API_TOKEN } from '@env';


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
      : 'https://via.placeholder.com/100x150';

    return (
      <View style={styles.container} >
        <Image source={{ uri: imageURL }} resizeMode="cover" style={styles.image} />
        <Text style={styles.character}>{item.character}</Text>
        <Text style={styles.name}>{item.name}</Text>
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
  container: {
    marginHorizontal: 4,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 4,
  },
  name: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 1,
    fontWeight: 'bold',
  },
  character: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 1,
    fontStyle: 'italic',
  },
});


export default CastDetail;
