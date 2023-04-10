import { View, Text, Image, StyleSheet } from "react-native";

interface BannerDetailProps {
  title: string;
  backdrop_path: string;
}


/* Este Componente Banner trae la ruta de imagen de fondo de la pelicula y el titulo de la pelicula desde las props */
const BannerDetail = (props: BannerDetailProps) => {
  const { title, backdrop_path } = props;
  const imageURL = `https://image.tmdb.org/t/p/w500${backdrop_path}`;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageURL }} resizeMode="cover" style={styles.banner} />
      <Text style={styles.header_text}>{title}</Text>
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
