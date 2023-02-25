import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { HeroImage } from "../assets";

const HomeScreen = () => {
  // returns the navigation prop of the screen it's inside.
  // go to another screen, figures out the action it needs to take to do it
  const navigation = useNavigation();

  // This is like useEffect, but is synchronous
  // This is to remove the header option at the top
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex flex-col h-full w-full bg-slate-50 relative">
      <View className="h-[40vh]">
        {/* Top Section */}
        <View className="flex flex-row items-center gap-3 w-full px-6 py-2">
          <View className="flex rounded-full items-center justify-center bg-slate-700 w-12 h-12">
            <Text className="text-white font-bold text-xl">N</Text>
          </View>
          <Text className="font-bold text-3xl">nexplore</Text>
        </View>

        {/* Hero Section */}
        <View className="px-6 mt-8 space-y-3">
          <Text className="text-slate-600 text-[42px]">
            Get out there and discover your
          </Text>
          <Text className="text-blue-500 font-bold text-[38px]">
            Next Adventure!
          </Text>
        </View>
      </View>

      <View className="h-full w-full relative">
        {/* Background circles */}
        <View className="w-[320px] h-[320px] bg-blue-500 rounded-full absolute -right-16"></View>
        <View className="w-[320px] h-[320px] bg-orange-400 rounded-full absolute  bottom-60 -left-12"></View>
        {/* Image Container */}

        <Image source={HeroImage} className="w-full h-[70%] object-cover" />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
