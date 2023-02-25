import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";

export default function App() {
  return (
      <SafeAreaView className="flex h-full bg-blue-600 justify-center items-center">
        <Text className="text-xl">Hello World!</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
  );
}

