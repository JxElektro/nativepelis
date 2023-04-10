import React, { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Context } from "../config/Context";
import ToggleButton from "./ToggleButton";
import * as Speech from "expo-speech";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

interface Genre {
  id: number;
  name: string;
}

interface MovieDetailsProps {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genres: Genre[];
  release_date: string;
}

/* Este componente muestra la información de la película seleccionada en la pantalla de detalles. trae esta info desde las props*/
const MovieInfo = (props: MovieDetailsProps) => {
  const { id, title, poster_path, overview, genres, release_date } = props;
  const [textSize, setTextSize] = useState(16);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigation = useNavigation();
  const { theme } = useContext(Context);
  const imageURL = `https://image.tmdb.org/t/p/w500${poster_path}`;

  /* Este código muestra los géneros de la película, pero solo los dos primeros */
  const displayedGenres = genres
    .slice(0, 2)
    .map((genre) => genre.name)
    .join(", ");

  /* Esta función reproduce la sinopsis de la película con la voz de Google */
  const speak = () => {
    if (isPlaying) {
      Speech.stop();
      setIsPlaying(false);
    } else {
      Speech.speak(overview, {
        language: "es",
        rate: 0.85,
        pitch: 1,
        onStart: () => setIsPlaying(true),
        onDone: () => setIsPlaying(false),
        onStopped: () => setIsPlaying(false),
      });
    }
  };

  /* Este código detiene la reproducción de la sinopsis de la película cuando se sale de la pantalla de detalles */
  useFocusEffect(
    React.useCallback(() => {
      const onBeforeRemove = () => {
        if (isPlaying) {
          Speech.stop();
        }
      };
      const unsubscribe = navigation.addListener("beforeRemove", onBeforeRemove);
      return () => {
        if (isPlaying) {
          Speech.stop();
        }
        unsubscribe();
      };
    }, [isPlaying, navigation])
  );

  /* Estas funciones aumentan y disminuyen el tamaño de la fuente del texto de la sinopsis de la película */
  const increaseFontSize = () => {
    if (textSize < 50) {
      setTextSize(textSize + 2);
    }
  };
  const decreaseFontSize = () => {
    if (textSize > 10) {
      setTextSize(textSize - 2);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.container }]}>
      <View style={styles.subContainer}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: imageURL }} resizeMode="cover" style={styles.image} />
          <Text style={[styles.text, { color: theme.title }]}>{displayedGenres}</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <Text
            style={{
              fontSize: textSize,
              paddingRight: 10,
              paddingLeft: 10,
              paddingTop: 10,
              paddingBottom: 10,
              color: theme.title,
            }}
          >
            {overview}
          </Text>
        </ScrollView>
      </View>
      <View
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, marginRight: 10 }}
      >
        <Text style={[styles.date, { color: theme.title }]}>Estreno: {release_date}</Text>
        <TouchableOpacity onPress={speak}>
          <Text style={[styles.buttonBar, { backgroundColor: theme.primary }]}>{isPlaying ? "🔇" : "🔊"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={increaseFontSize}>
          <Text style={[styles.buttonBar, { backgroundColor: theme.primary }]}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={decreaseFontSize}>
          <Text style={[styles.buttonBar, { backgroundColor: theme.primary }]}>➖</Text>
        </TouchableOpacity>
        <ToggleButton style={[styles.buttonBar, { backgroundColor: theme.primary }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
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
    paddingTop: 20,
  },
  image: {
    width: 100,
    height: 200,
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
    fontStyle: "italic",
    paddingTop: 5,
  },
  date: {
    fontSize: 16,
    width: "50%",
    textAlign: "center",
  },
  scrollView: {
    width: "65%",
    marginRight: 4,
    marginTop: 2,
    height: 300,
  },
  buttonBar: {
    fontSize: 15,
    marginRight: 10,
    borderRadius: 50,
    padding: 10,
  },
});

export default MovieInfo;
