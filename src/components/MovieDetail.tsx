
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { API_TOKEN } from '@env';

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
        console.error('Error fetching movie details:', error);
      });
  }, [movieId]);

  if (!movieDetails) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const imageURL = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
  const genres = movieDetails.genres.slice(0, 2).map((genre) => genre.name).join(', ');

  
  
  return (
    <View style={styles.container}>
      <View style={styles.imageAndTextContainer}>
        <View style={styles.imageAndGenresContainer}>
          <Image source={{ uri: imageURL }} resizeMode="cover" style={styles.movieImage} />
          <Text style={styles.movieGenres}>{genres}</Text>
        </View>
        <Text style={styles.movieOverview}>{movieDetails.overview}</Text>
      </View>
      <Text style={styles.movieReleaseDate}>Release Date: {movieDetails.release_date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageAndTextContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  imageAndGenresContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 16,
    marginLeft: 5,
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginTop: 10,
  },
  movieOverview: {
    fontSize: 16,
    flex: 1,
    marginRight: 16,
    marginTop: 10,
  },
  movieGenres: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 8,
  },
  movieReleaseDate: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default MovieDetails;