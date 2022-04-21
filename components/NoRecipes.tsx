import * as React from "react";
import {Text, View} from "react-native"
import tw from "twrnc";

import RamenCup from "./RamenCup"

export default function SearchIcon() {
  return (
   <View style={tw`p-4`}>
       <Text style={tw`text-center mt-6 mb-10 text-gray-500`}>No Recipes found!</Text>
       <RamenCup style={tw`h-40 w-40 mx-auto`}/>
   </View>
  );
}
