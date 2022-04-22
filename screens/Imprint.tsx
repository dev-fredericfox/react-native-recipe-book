import { Fragment, useEffect, useState } from "react";
import { ActivityIndicator, Text, Dimensions, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import tw from "twrnc";

import { RootStackParamList} from "../constants/Types";


type NavProp = NativeStackScreenProps<RootStackParamList, "Imprint">;

export default function Imprint({ navigation }: NavProp) {
  return (
    <View style={tw`flex-initial bg-slate-100`}>
      <Text>Angaben gemäß § 5 TMG</Text>
      <Text>Frederic Fox</Text>
      <Text>Hintere Dorfstr. 6</Text>
      <Text>79588 Efringen-Kirchen</Text>
      <Text>Kontakt Telefon: 016092201612</Text>
      <Text>E-Mail: dev.frederic.fox@gmail.com</Text>
      <Text>Quelle: eRecht24</Text>
    </View>
  );
}
