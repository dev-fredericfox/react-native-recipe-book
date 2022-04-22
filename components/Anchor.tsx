import { Text } from 'react-native';
import * as Linking from 'expo-linking';

export default function Anchor(props) {
  const handlePress = (href:string) => {
    Linking.openURL(href);
    props.onPress && props.onPress();
  };
    return (
      <Text {...props} onPress={() => handlePress(props.href)}>
        {props.children}
      </Text>
    );
  }

// <Anchor href="https://google.com">Go to Google</Anchor>
// <Anchor href="mailto:support@expo.dev">Email support</Anchor>