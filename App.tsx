import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import HomeScreen from "./screens/HomeScreen";
import RecipeScreen from "./screens/RecipeScreen";
import Imprint from "./screens/Imprint"
import Privacy from "./screens/Privacy"
import { RootStackParamList } from "./constants/Types";


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{headerTitle: 'Freds Cooking Corner'}} name="Home" component={HomeScreen} />
        <Stack.Screen name="Recipe" component={RecipeScreen} options={{headerBackTitleVisible: false}} />
        <Stack.Screen name="Imprint" component={Imprint} options={{headerBackTitleVisible: false}} />
        <Stack.Screen name="Privacy" component={Privacy} options={{headerBackTitleVisible: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
