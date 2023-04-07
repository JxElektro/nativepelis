import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet , SafeAreaView} from 'react-native';
import { API_TOKEN } from '@env';
import { Context } from "../config/Context";

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
  const { theme } = useContext(Context);

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
<SafeAreaView style={{ flex:1 , backgroundColor:theme.container }}>
      <View style={[styles.container]}>
        <Image source={{ uri: imageURL }} resizeMode="cover" style={styles.image} />
        <Text style={[styles.character, { color: theme.primary }]}>{item.character}</Text>
        <Text style={[styles.name, { color: theme.primary }]}>{item.name}</Text>
      </View>
</SafeAreaView>
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
    marginTop: 2,
    height: 600
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
