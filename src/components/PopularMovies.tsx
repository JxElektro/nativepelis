import React, { useEffect, useState , useContext} from "react";
import { TouchableOpacity, Text, FlatList, Image, Dimensions, StyleSheet, View, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API_TOKEN } from "@env";
import { Context } from "../config/Context";


const windowWidth = Dimensions.get("window").width;
const numColumns = 3;



interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieItemProps {
  item: Movie;
  onPress: () => void;
}

interface PopularMoviesProps {}



const PopularMovies: React.FC<PopularMoviesProps> = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { lightMode, theme } = useContext(Context);

/*
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme.primary,
      },
      headerTintColor: theme.title,
    });
  }, [lightMode]);
*/

  const MovieItem: React.FC<MovieItemProps> = React.memo(({ item, onPress }) => {
    const imageURL = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.movieContainer}>
          <Image source={{ uri: imageURL }} resizeMode="cover" style={styles.movieImage} />
          <Text style={[styles.movieTitle,, { color: theme.primary }] }>{item.title}</Text>
        </View>
      </ TouchableOpacity>
    );
  });

  const renderItem = ({ item }: { item: Movie }) => {
    return (
      <MovieItem 
        item={item}
        onPress={() => {
          navigation.navigate("MovieDetails", { movieId: item.id });
        }}
      />
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
  <View style={[styles.container, { backgroundColor: theme.container }]}>
  <View style={[styles.searchBar, { backgroundColor: theme.container }]}>
    <TextInput
      placeholder="Search movies..."
      style={[styles.searchInput, { backgroundColor: theme.primary }]}
      value={searchText}
      onChangeText={onSearch}
    />
  </View>
  <Text style={[styles.header, { color: theme.primary }]}>{header}</Text>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        onEndReached={() => setPage((prevPage) => prevPage + 1)}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
      />
    </View>
  );
};



const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_TOKEN}`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    padding: 8,
  },
  searchInput: {
    borderRadius: 8,
    padding: 8,
  },
  header: {
    fontSize: 24,
    margin: 14,
    textAlign: "center",
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
    fontFamily: "poppins-regular",
    marginTop: 8,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default PopularMovies;