import * as React from "react";
import Svg, { Path } from "react-native-svg";
import tw from "twrnc";

export default function SearchIcon() {
  return (
    <Svg style={tw`h-6 w-6 z-2`} viewBox="0 0 20 20" fill="#c6c9cb">
      <Path
        fill-rule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clip-rule="evenodd"
      />
    </Svg>
  );
}
