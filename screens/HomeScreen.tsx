import { Fragment, useEffect, useState } from "react";
import { ActivityIndicator, Text, Dimensions, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Recipe, RootStackParamList, Category } from "../constants/Types";
import Tiles from "../components/Tiles";
import Tab from "../components/Tab";

//Local Interfaces for Props
type ItemProp = {
  item: Recipe;
};
type NavProp = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: NavProp) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState([]);

  const filterFunction = (category: string | null) => {
    let localFilteredData = data;
    if (category !== "All" && category !== null) {
      localFilteredData = data.filter((el: Recipe) => el.category.name === category);
    }
    setFilteredData(localFilteredData);
  };

  const getRecipes = async () => {
    try {
      const response = await fetch("https://freds-recipe-book.vercel.app/api/getall");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  useEffect(() => {
    filterFunction(filter);
  }, [filter]);

  return (
    <View style={{ flex: 0 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Fragment>
          <Tab data={data} navigation={navigation} filterFunction={setFilter} />
          <Tiles data={filteredData} navigation={navigation} />
        </Fragment>
      )}
    </View>
  );
}
