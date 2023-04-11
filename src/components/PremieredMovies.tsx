import React, { useEffect, useState , useContext} from "react";
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API_TOKEN } from "@env";
import ToggleButton from "./ToggleButton";
import { Context } from "../config/Context";


const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_TOKEN}`;
const windowWidth = Dimensions.get("window").width;

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
}

interface MovieItemProps {
  item: Movie;
}

const PremieredMovies = (props: any) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { theme } = useContext(Context);

  const MovieItem: React.FC<MovieItemProps> = React.memo(({ item }) => {
    const imageURL = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
    const navigation = useNavigation<StackNavigationProp<any>>();

    return (
      <TouchableOpacity
        style={{ backgroundColor: theme.container }}
        onPress={() => {
          navigation.navigate("MovieDetails", { movieId: item.id });
        }}
      >
        <View style={{ width: windowWidth * 0.7, marginRight: 16 }}>
          <Image source={{ uri: imageURL }} resizeMode="cover" style={styles.imagePremiere} />
          <Text style={[styles.movieTitle, { color: theme.primary }]}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  });

  const renderItem = ({ item }: { item: Movie }) => {
    return <MovieItem item={item} />;
  };

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
      <View style={[styles.headerContainer, { backgroundColor: theme.container }]}>
        <Text style={[styles.header_text, { color: theme.primary }]}>Premiered Movies</Text>
        <ToggleButton style={[styles.button , {backgroundColor: theme.primary}]}/>
      </View>
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

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  header_text: {
    fontSize: 30,
    textAlign: "center",
    paddingLeft: 60,
    paddingVertical: 20,
    fontWeight: "bold",
  },
  movieTitle: {
    marginTop: 4,
    fontSize: 18,
    textAlign: "center",
  },
  imagePremiere: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  button: {
    marginRight: 7,
    borderRadius: 50,
    padding: 7,
  },

});

export default PremieredMovies;

