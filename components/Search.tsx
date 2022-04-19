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
  const [dedupedCategories, setDedupedCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const handleSearch = (keyword: string) => {
    setSearch(keyword);
    searchFunction(keyword);
  };

  return (
    <View style={tw`mx-2 pb-3 bg-red-200`}>
      <TextInput onChangeText={handleSearch} value={search} />
    </View>
  );
}
