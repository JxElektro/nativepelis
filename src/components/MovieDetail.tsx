import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { API_TOKEN } from '@env';
import tw from 'tailwind-react-native-classnames';

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
      <View style={tw`flex items-center justify-center h-48`}>
        <Text style={tw`text-lg font-bold`}>Loading...</Text>
      </View>
    );
  }

  const imageURL = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
  const genres = movieDetails.genres.slice(0, 2).map((genre) => genre.name).join(', ');

  return (
    <View style={tw`flex-col items-center mt-5`}>
      <View style={tw`flex-row mb-4`}>
        <View style={tw`flex-col w-24 items-center mr-4 ml-1`}>
          <Image source={{ uri: imageURL }} resizeMode="cover" style={tw`w-24 h-36 rounded-lg mt-2`} />
          <Text style={tw`text-base italic mt-2`}>{genres}</Text>
        </View>
        <Text style={tw`text-base flex-1 mr-4 mt-2`}>{movieDetails.overview}</Text>
      </View>
      <Text style={tw`text-base font-bold text-center mb-2`}>Release Date: {movieDetails.release_date}</Text>
    </View>
  );
};

export default MovieDetails;
