import React, { useEffect, useState } from "react";
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
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const window = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
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

  const button = (
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate("Recipe")}
    />
  );

  const Item = ({ title, id, coverimg, ingredients, category, content }) => (
    <View style={[styles.coverImageWrapper]}>
      <TouchableHighlight
        activeOpacity={0.9}
        underlayColor="#DDDDDD"
        onPress={() => navigation.push("Recipe",{content,coverimg,ingredients,title,})}
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
            {ingredients.length} Ingredients | {category}
          </Text>
        </ImageBackground>
      </TouchableHighlight>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      id={item.id}
      coverimg={item.coverimg}
      ingredients={item.ingredients}
      category={item.category.name}
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
          keyExtractor={({ id }, index) => id}
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
