import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { API_TOKEN } from "@env";

interface MovieDetailsProps {
  movieId: number;
}

interface Genre {
  id: number;
  name: string;
}

interface MovieDetailsData {
  title: string;
  poster_path: string;
  overview: string;
  genres: Genre[];
  release_date: string;
}

const MovieDetails = (props: MovieDetailsProps) => {
  const { movieId } = props;
  const [movieDetails, setMovieDetails] = useState<MovieDetailsData | null>(null);

  const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_TOKEN}`;

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails({
          title: data.title,
          poster_path: data.poster_path,
          overview: data.overview,
          genres: data.genres || [],
          release_date: data.release_date,
        });
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [movieId]);

  if (!movieDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  const imageURL = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
  const genres = movieDetails.genres
    .slice(0, 2)
    .map((genre) => genre.name)
    .join(", ");

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: imageURL }} resizeMode="cover" style={styles.image} />
          <Text style={styles.text}>{genres}</Text>
        </View>

        <Text style={styles.details}>{movieDetails.overview}</Text>
      </View>
      <Text style={styles.date}>Release Date: {movieDetails.release_date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 5,
  },
  subContainer: {
    flexDirection: "row",
    paddingBottom: 18,
    paddingTop: 30,
  },
  leftContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingRight: 8,
    paddingLeft: 1,
    width: "30%",
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
    fontStyle: "italic",
    paddingTop: 5,
  },
  details: {
    fontSize: 16,
    width: "65%",
    marginRight: 4,
    marginTop: 2,
  },
  date: {
    fontSize: 16,
    width: "65%",
    textAlign: "center",
    marginBottom: 2,
  },
});

export default MovieDetails;
