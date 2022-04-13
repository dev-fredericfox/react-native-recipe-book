import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

import { Ingredient } from "../constants/Types";

interface IngredientWithFactor extends Ingredient {
  multiplicationFactor: string; 
}

export default function IngredientList({
  amount,
  emoji,
  ingredient,
  unit,
  multiplicationFactor
}: IngredientWithFactor) {
  const [gathered, setGathered] = useState(false);
  const [amountTimesFactor, setAmountTimesFactor] = useState(0)
  
  useEffect(() => {
    const multiplicationFactorNum = parseFloat(multiplicationFactor)
    const amountNum = parseFloat(amount)
    let product
    if (multiplicationFactorNum <= 0) {
      product = 1*amountNum  
    } else if (isNaN(multiplicationFactorNum)) {
      product = 1*amountNum  
    } else {
    product = multiplicationFactorNum*amountNum
    }
    setAmountTimesFactor(product)
  },[multiplicationFactor])

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={tw.style(
        "flex",
        "flex-row",
        "items-center",
        "bg-slate-200",
        "p-2",
        "mt-3",
        "rounded-lg",
        "border-2",
        gathered ? "border-green-600" : "border-slate-200"
      )}
      onPress={() => setGathered(!gathered)}
    >
      <View
        style={tw`bg-white rounded-lg w-14 h-14 flex flex-row items-center justify-center`}
      >
        <Text style={tw`text-4xl text-center`}>{emoji} </Text>
      </View>
      <Text style={tw`font-bold grow px-2 py-3 w-1/3`}>{ingredient}</Text>
      <Text style={tw`text-gray-500`}>
        {amountTimesFactor} {unit}
      </Text>
    </TouchableOpacity>
  );
}
