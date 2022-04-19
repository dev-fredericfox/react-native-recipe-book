import { Fragment, useEffect, useState } from "react";
import { FlatList, TextInput, Pressable, Text, View } from "react-native";
import tw from "twrnc";

import { Category, Ingredient, Recipe } from "../constants/Types";

type Props = {
  data: Recipe[];
  searchFunction: any;
};

type RenderItemProps = {
  item: string;
};

type CategoryDeduped = {
  category: string;
};

export default function Tiles({ data, searchFunction }: Props) {
  const [search, setSearch] = useState("");

  const handleSearch = (keyword: string) => {
    setSearch(keyword);
    searchFunction(keyword);
  };

  return (
    <View style={tw`mx-2 pb-3`}>
      <TextInput style={tw`bg-white shadow-md rounded px-4 pt-3 pb-4 mb-2 mt-2`} onChangeText={handleSearch} value={search} />
    </View>
  );
}
