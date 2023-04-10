import { View, Text, StyleSheet } from "react-native";
import BannerDetail from "../components/BannerDetail";
import MovieInfo from "../components/MovieInfo";
import CastDetail from "../components/CastDetail";
import React, { useEffect, useState, useContext } from "react";
import { API_TOKEN } from "@env";
import { Context } from "../config/Context";

interface Genre {
  id: number;
  name: string;
}

interface CastMember {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

interface MovieDetailsData {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  genres: Genre[];
  release_date: string;
  cast: CastMember[];
}

/* este componente es el que muestra los detalles de la pelicula seleccionada */
const MovieDetails = ({ route }: any) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState<MovieDetailsData | null>(null);
  const { theme } = useContext(Context);

  const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_TOKEN}&language=es-ES&append_to_response=credits`;


  /* este codigo hace el fetch de los detalles de la pelicula seleccionada que se enviara mediante props a sus subcomponentes */
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails({
          id: data.id,
          title: data.title,
          poster_path: data.poster_path,
          backdrop_path: data.backdrop_path,
          overview: data.overview,
          genres: data.genres || [],
          release_date: data.release_date,
          cast: data.credits.cast || [],
        });
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [movieId]);

  if (!movieDetails) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.container }]}>
        <Text style={{ color: theme.title }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <BannerDetail title={movieDetails.title} backdrop_path={movieDetails.backdrop_path} />
      <MovieInfo
        poster_path={movieDetails.poster_path}
        overview={movieDetails.overview}
        genres={movieDetails.genres}
        release_date={movieDetails.release_date}
        id={movieDetails.id}
        title={movieDetails.title}
      />
      <CastDetail cast={movieDetails.cast} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MovieDetails;

