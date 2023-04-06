import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { API_TOKEN } from "@env";


interface BannerDetailProps {
  movieId: number;
}

interface MovieDetails {
  title: string;
  backdrop_path: string;
}

const BannerDetail = (props: BannerDetailProps) => {
  const { movieId } = props;
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_TOKEN}`;

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails({ title: data.title, backdrop_path: data.backdrop_path });
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [movieId]);

  if (!movieDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.header_text}>Loading...</Text>
      </View>
    );
  }

  const imageURL = `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageURL }} resizeMode="cover" style={styles.banner} />
      <Text style={styles.header_text}>{movieDetails.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header_text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    color: "white",
  },
  container: {
    position: "relative",
  },
  banner: {
    width: "100%",
    height: 200,
  },
});

export default BannerDetail;
