import React, { useEffect, useState , useContext} from "react";
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { API_TOKEN } from "@env";
import ToggleButton from "./ToggleButton";
import { Context } from "../config/Context";

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
  const { lightMode } = useContext(Context);


  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate("MovieDetails", { movieId: item.id });
      }}
    >
      {/*} This divide the windows {*/}
      <View style={{ width: windowWidth * 0.7, marginRight: 16 }}>
        <Image source={{ uri: imageURL }} resizeMode="cover" style={styles.imagePremiere} />
        <Text style={styles.movieTitle}>{item.title}</Text>
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
      <View style={styles.headerContainer}>
      <Text style={styles.header_text}>Premiered Movies        </Text>
      <ToggleButton/>
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
  button: {
    backgroundColor: "#AFCEE3",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#AFCEE3",
  },
  header_text: {
    fontSize: 24,
    textAlign: "center",
    color: "#0E2859",
    backgroundColor: "#AFCEE3",
    paddingLeft: 50,
    paddingVertical: 20,
    fontWeight: "bold",
  },
  headContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#AFCEE3",
  },
  movieTitle: {
    marginTop: 4,
    fontSize: 18,
    textAlign: "center",
    color: "#0E2859",
  },
  imagePremiere: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
});

export default PremieredMovies;
