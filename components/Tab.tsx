import { Fragment, useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import tw from "twrnc";

import { Category, Ingredient, Recipe } from "../constants/Types";

type Props = {
  data: Recipe[];
  filterFunction: any;
};

type RenderItemProps = {
  item: string;
};

type CategoryDeduped = {
  category: string;
};

export default function Tiles({ data, filterFunction }: Props) {
  const [dedupedCategories, setDedupedCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState("All");

  const handlePress = (category: string) => {
    setSelected(category);
    filterFunction(category);
  };
  useEffect(() => {
    const categoryArray = data.map((el) => el.category.name);
    const dedupe = ["All", ...new Set(categoryArray)];
    setDedupedCategories(dedupe);
    filterFunction(selected);
  }, []);
  const Item = ({ category }: CategoryDeduped) => (
    <View style={tw`mx-2 pb-3 `}>
      <Pressable onPress={() => handlePress(category)}>
        <View style={tw`rounded-lg ${selected === category ? "bg-green-700" : ""}`}>
          <Text
            style={tw`text-center py-3 px-2 rounded-lg min-h-10 min-w-[60px] ${
              selected === category ? "text-white" : ""
            }`}
          >
            {category}
          </Text>
        </View>
      </Pressable>
    </View>
  );

  const renderItem = ({ item }: RenderItemProps) => <Item category={item} key={item} />;
  return (
    <FlatList
      data={dedupedCategories}
      renderItem={renderItem}
      horizontal={true}
      keyExtractor={(item) => item}
    />
  );
}
