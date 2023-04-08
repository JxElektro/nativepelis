import React, { useContext } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Context } from "../config/Context";

interface SearchBarProps {
  searchText: string;
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, onSearch }) => {
  const { theme } = useContext(Context);

  return (
    <View style={[styles.searchBar, { backgroundColor: theme.container }]}>
      <TextInput
        placeholder="Search movies..."
        style={[styles.searchInput, { backgroundColor: theme.primary }]}
        value={searchText}
        onChangeText={onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    padding: 8,
  },
  searchInput: {
    borderRadius: 8,
    padding: 8,
  },
});

export default SearchBar;
