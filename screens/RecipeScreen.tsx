import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image,SafeAreaView,ScrollView,StyleSheet,Text, View } from "react-native";

import Device from "../constants/Device"

export default function RecipeScreen({route}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {title, coverimg, ingredients, category, content} = route.params

  return (
    <SafeAreaView >
    <ScrollView style={{ paddingLeft: 24 }}>
      <Text>{route.params.title}</Text>
      <Image
        source={{
          uri: coverimg,
        }}
        resizeMode="cover"
        style={[styles.coverimg]}
      />
      <Text>Ingredients {ingredients.length}</Text>
      <Text>Recipe</Text>
      <Text>{content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  coverimg: {
  width: Device.window.width - 48,
  borderRadius: 20,
  height: 200,
  }

})