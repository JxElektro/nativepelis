import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, FlatList, Image, Dimensions, StyleSheet, View, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API_TOKEN } from "@env";

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
  const [searchText, setSearchText] = useState('');
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


  const fetchMovies = (pageNumber: number, query?: string) => {
    let url = `${API_URL}&page=${pageNumber}`;
    if (query) {
      url = `${SEARCH_URL}&query=${query}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };

  useEffect(() => {
    fetchMovies(page, searchText);
  }, [page, searchText]);

  const onSearch = (text: string) => {
    setMovies([]);
    setPage(1);
    setSearchText(text);
  };

  const header = searchText ? `Search results for "${searchText}"` : "Popular Movies";

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search movies..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={onSearch}
        />
        
      </View>
      <Text style={styles.header}>{header}</Text>
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



const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_TOKEN}`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AFCEE3",
  },
  searchBar: {
    backgroundColor: "#215EBB",
    padding: 8,
  },
  searchInput: {
    backgroundColor: "#AFCEE3",
    borderRadius: 8,
    padding: 8,
  },
  header: {
    fontSize: 24,
    //fontFamily : "poppins-bold",
    margin: 14,
    textAlign: "center", 
    color: "#0E2859",
    fontWeight: "bold",
  },
  movieContainer: {
    width: windowWidth / numColumns,
    marginBottom: 16,
  },
  movieImage: {
    width: "90%",
    aspectRatio: 2 / 3,
    borderRadius: 8,
    alignSelf: "center",
  },
  movieTitle: {
    fontSize: 16,
    fontFamily : "poppins-regular",
    marginTop: 8,
    textAlign: "center",
    color: "#0E2859",
    marginHorizontal: 20
  },
});

export default PopularMovies;
