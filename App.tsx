import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Discover from "./screens/Discover";
import HomeScreen from "./screens/HomeScreen";
import LocationDetails from "./screens/LocationDetails";

export type RootStackParamList = {
  Home: undefined;
  Discover: undefined;
  Location: { param: string };
};

// returns Screen and Navigator which are used for configuring the navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen name="Location" component={LocationDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
