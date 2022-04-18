import { Fragment, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import tw from "twrnc";

import { Category, Ingredient, Recipe } from "../constants/Types";
interface IngredientWithFactor extends Ingredient {
  multiplicationFactor: string;
}

type Props = {
  data: Recipe[],
  navigation: any
}

type ItemProp = {
  item: Recipe;
};

const window = Dimensions.get("window");

export default function Tiles({data, navigation}:Props) {
  const Item = ({ title, id, coverimg, ingredients, category, content }: Recipe) => (
    <View style={[styles.coverImageWrapper]}>
      <TouchableHighlight
        activeOpacity={0.9}
        underlayColor="#DDDDDD"
        onPress={() => navigation.push("Recipe", { content, coverimg, ingredients, title })}
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
    <FlatList data={data} keyExtractor={({ title }, index) => title} renderItem={renderItem} />
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
