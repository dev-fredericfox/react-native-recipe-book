import { Fragment, useEffect, useState } from "react";
import { FlatList, TextInput, Pressable, Text, View } from "react-native";
import SearchIcon from "./SearchIcon"

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
    <View style={tw`mx-2 flex flex-row pb-3 mx-[24px] bg-white shadow-md rounded py-3 my-4 pl-4`}>
      <SearchIcon/>
      <TextInput
        placeholder="Curry, Udon, Pizza..."
        style={tw`ml-2 pr-10`}
        onChangeText={handleSearch}
        value={search}
      />
    </View>
  );
}
