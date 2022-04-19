import { Fragment, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
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

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Fragment>
          <Tab data={data} navigation={navigation}></Tab>
          <Tiles data={data} navigation={navigation} />
        </Fragment>
      )}
    </View>
  );
}
