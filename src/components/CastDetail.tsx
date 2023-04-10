import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Context } from "../config/Context";

interface CastMember {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

interface CastDetailProps {
  cast: CastMember[];
}

/* Este componente muestra la lista de actores de una película */
const CastDetail = (props: CastDetailProps) => {
  const { cast } = props;
  const { theme } = useContext(Context);

  const renderItem = ({ item }: { item: CastMember }) => {
    const imageURL = item.profile_path
      ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
      : 'https://via.placeholder.com/100x150';

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.container }}>
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

