import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API_TOKEN } from "@env";


/* Import the Api Token */
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_TOKEN}`;

const windowWidth = Dimensions.get("window").width;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieItemProps {
  item: Movie;
}

const MovieItem: React.FC<MovieItemProps> = React.memo(({ item }) => {
  const imageURL = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("MovieDetails", { movieId: item.id });
      }}
    >
      <View style={{ width: windowWidth * 0.7, marginRight: 16 }}>
        <Image
          source={{ uri: imageURL }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 200,
            borderRadius: 8,
          }}
        />
        <Text style={{ marginTop: 8, fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
});

const renderItem = ({ item }: { item: Movie }) => {
  return <MovieItem item={item} />;
};

const PremieredMovies = (props: any) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Premiered Movies</Text>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default PremieredMovies;
