import { Fragment, useEffect, useState } from "react";
import { FlatList,Pressable, Text, View } from "react-native";
import tw from "twrnc";

import { Category, Ingredient, Recipe } from "../constants/Types";

type Props = {
  data: Recipe[];
  navigation: any;
};

type RenderItemProps = {
  item: string;
};

type CategoryDeduped = {
  category: string;
};

export default function Tiles({ data, navigation }: Props) {
  const [dedupedCategories, setDedupedCategories] = useState<string[]>([]);
  const [selected, setSelected] = useState("All")
  useEffect(() => {
    const categoryArray = data.map((el) => el.category.name);
    const dedupe = ["All", ...new Set(categoryArray)];
    setDedupedCategories(dedupe);
  }, []);
  const Item = ({ category }: CategoryDeduped) => (
    <View style={tw` mx-2 pb-3 `}>
        <Pressable onPress={() => setSelected(category)}>
      <View style={tw`  rounded-lg ${selected === category ? 'bg-green-700' : '' }`} >
        <Text style={tw`text-center py-3 px-2 rounded-lg min-w-[60px] ${selected === category ? 'text-white' : '' }`}>
          {category}
        </Text>
      </View>
      </Pressable>
    </View>
  );

  const renderItem = ({ item }: RenderItemProps) => <Item category={item} key={item} />;
  return <FlatList data={dedupedCategories} renderItem={renderItem} horizontal={true} />;
}
