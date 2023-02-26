import { View, Text, Image, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "../assets";

type discoverProps = StackNavigationProp<RootStackParamList, "Discover">;

const Discover = () => {
  const navigation = useNavigation<discoverProps>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-slate-50 relative">
      {/* Top Bar */}
      <View className="flex-row items-center justify-between px-8 mt-8">
        <Text className="text-4xl font-bold">Discover</Text>

        {/* Profile Picture Container */}
        <View className="w-12 h-12 bg-gray-400 shadow-md rounded-md items-center justify-center">
          <Image
            source={Avatar}
            className="w-full h-full rounded-md object-cover"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Discover;
