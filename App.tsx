import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";

export default function App() {
  return (
      <SafeAreaView className="flex bg-blue-600 items-center">
        <Text className="text-xl">Hello !</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
  );
}

