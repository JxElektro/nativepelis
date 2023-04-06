import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { API_TOKEN } from "@env";
import tw from 'tailwind-react-native-classnames';

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

  const imageURL = `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`;

  return (
    <View style={tw`relative`}>
      <Image source={{ uri: imageURL }} resizeMode="cover" style={tw`w-full h-60`} />
      <Text style={tw`text-2xl font-bold text-center absolute bottom-0 w-full bg-black bg-opacity-50 text-white py-2`}>{movieDetails.title}</Text>
    </View>
  );
};

export default BannerDetail;
