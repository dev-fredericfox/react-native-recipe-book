import { useEffect, useState, Fragment } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Recipe, RootStackParamList, Category } from "../constants/Types";

//Local Interfaces for Props
type ItemProp = {
  item: Recipe;
};

type NavProp = NativeStackScreenProps<RootStackParamList, "Home">;

const window = Dimensions.get("window");

export default function HomeScreen({ navigation }: NavProp) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getRecipes = async () => {
    try {
      const response = await fetch(
        "https://freds-recipe-book.vercel.app/api/getall"
      );
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

  const Item = ({
    title,
    id,
    coverimg,
    ingredients,
    category,
    content,
  }: Recipe) => (
    <View style={[styles.coverImageWrapper]}>
      <TouchableHighlight
        activeOpacity={0.9}
        underlayColor="#DDDDDD"
        onPress={() =>
          navigation.push("Recipe", { content, coverimg, ingredients, title })
        }
      >
        <ImageBackground
          source={{ uri: coverimg }}
          resizeMode="cover"
          imageStyle={{ opacity: 0.7 }}
          style={[styles.coverimg]}
        >
          <Text style={[styles.textOverlay, styles.textTitle]}>
            {title}, {id}
          </Text>
          <Text style={[styles.textOverlay, styles.textSubTitle]}>
            <Fragment>
              {ingredients.length} Ingredients | {category}
            </Fragment>
          </Text>
        </ImageBackground>
      </TouchableHighlight>
    </View>
  );

  const renderItem = ({ item }: ItemProp) => (
    <Item
      title={item.title}
      id={item.id}
      coverimg={item.coverimg}
      ingredients={item.ingredients}
      category={item.category.name as unknown as Category}
      content={item.content}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ title }, index) => title}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  coverimg: {
    width: window.width,
    height: 200,
    flex: 1,
    justifyContent: "flex-end",
  },
  coverImageWrapper: {
    width: window.width - 48,
    marginTop: 10,
    marginLeft: 24,
    marginBottom: 10,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  textSubTitle: {
    marginBottom: 20,
  },
  textTitle: { fontWeight: "bold" },
  textOverlay: {
    color: "#fff",
    marginLeft: 20,
  },
});
