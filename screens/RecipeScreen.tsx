import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import tw from "twrnc";

import IngredientList from "../components/IngredientList";
import Device from "../constants/Device";

export default function RecipeScreen({ route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [number, setNumber] = useState('1');

  const { title, coverimg, ingredients, category, content } = route.params;

  const renderItem = ({ item }) => (
    <IngredientList
      ingredient={item.ingredient}
      emoji={item.emoji}
      amount={item.amount}
      unit={item.unit}
      multiplicationFactor={number}
    />
  );

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Text style={tw`text-2xl font-bold text-center`}>{title}</Text>
          <Image
            source={{
              uri: coverimg,
            }}
            resizeMode="cover"
            style={[styles.coverimg, tw`my-6`]}
          />
          <Text style={tw`text-2xl font-bold`}>
            Ingredients ({ingredients.length})
          </Text>
        </>
      }
      data={ingredients}
      keyExtractor={({ ingredient }, index) => ingredient}
      renderItem={renderItem}
      style={tw`px-6`}
      ListFooterComponent={
        <>
          <View style={tw`flex flex-row-reverse mt-4`}>
          <TextInput
              style={tw`w-1/6 bg-white text-lg rounded-lg h-10`}
              onChangeText={setNumber}
              value={number}
              textAlign={'center'}
              placeholder="1"
              keyboardType="numeric"
            />
            <Text style={tw`text-lg my-auto`}>Ingredient Ratio: </Text>

          </View>
          <Text style={tw`text-2xl font-bold`}>Recipe</Text>
          <Text>{content}</Text>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  coverimg: {
    width: Device.window.width - 48,
    borderRadius: 20,
    height: 200,
  },
});
