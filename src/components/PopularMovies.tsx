import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, FlatList, Image, Dimensions, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const API_KEY = "c2d1eba2da68e492d514141b781c25cf";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

const windowWidth = Dimensions.get("window").width;
const numColumns = 3;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface PopularMoviesProps {}

const PopularMovies: React.FC<PopularMoviesProps> = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const navigation = useNavigation<StackNavigationProp<any>>();

  const renderItem = ({ item }: { item: Movie }) => {
    const imageURL = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MovieDetails", { movieId: item.id });
        }}
      >
        <View style={styles.movieContainer}>
          <Image source={{ uri: imageURL }} resizeMode="cover" style={styles.movieImage} />
          <Text style={styles.movieTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const fetchMovies = (pageNumber: number) => {
    fetch(`${API_URL}&page=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <View>
      <Text style={styles.header}>Popular Movies</Text>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        onEndReached={() => setPage((prevPage) => prevPage + 1)}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  movieContainer: {
    width: windowWidth / numColumns,
    padding: 8,
  },
  movieImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  movieTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default PopularMovies;
