import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <View style={tw`p-4 bg-gray-200`}>
      <TextInput
        style={tw`px-4 py-2 rounded-full bg-white`}
        placeholder="Search movies"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
    </View>
  );
};

export default SearchBar;
