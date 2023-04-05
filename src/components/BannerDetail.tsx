// BannerDetail.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

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

  const API_KEY = 'c2d1eba2da68e492d514141b781c25cf';
  const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails({ title: data.title, backdrop_path: data.backdrop_path });
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

  const imageURL = `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`;

  return (
    <View>
      <Image source={{ uri: imageURL }} resizeMode="cover" style={styles.bannerImage} />
      <Text style={styles.movieTitle}>{movieDetails.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerImage: {
    width: '100%',
    height: 200,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default BannerDetail;
