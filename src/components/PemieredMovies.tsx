import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Dimensions } from "react-native";

const API_KEY = "c2d1eba2da68e492d514141b781c25cf";
const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;

const windowWidth = Dimensions.get("window").width;

const renderItem = ({ item }) => {
  const imageURL = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

  return (
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
      <Text style={{ marginTop: 8, fontSize: 18, fontWeight: "bold" }}>
        {item.title}
      </Text>
    </View>
  );
};

const PremieredMovies = (props: any) => {
  const [movies, setMovies] = useState([]);

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
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Premiered Movies
      </Text>
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
