import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { HeroImage, Logo } from "../assets";

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
    <SafeAreaView className="flex h-full w-full bg-slate-50">
      <View className="h-[33vh]">
        {/* Top Section */}
        <View className="flex flex-row w-full px-6 py-2">
            <Image source={Logo} resizeMode="contain" className="w-1/2 h-14" />
          {/* <View className="flex rounded-full items-center justify-center bg-slate-700 w-12 h-12">
            <Text className="text-white font-bold text-xl">N</Text>
          </View>
          <Text className="font-bold text-3xl">nexplore</Text> */}
        </View>

        {/* Hero Section */}
        <View className="px-6 mt-8 space-y-3">
          <Text className="text-slate-600 text-[42px]">
            Get out there and discover your
          </Text>
          <Text className="text-black font-bold text-[38px]">
            Next Adventure!
          </Text>
        </View>
      </View>

      <View className="flex items-center justify-center h-full w-full relative">
        {/* Background circles */}
        <View className="h-full w-full">
          <View className="w-[320px] h-[320px] bg-blue-500 rounded-full absolute -right-16"></View>
          <View className="w-[320px] h-[320px] bg-orange-400 rounded-full absolute  bottom-60 -left-12"></View>

          <Image source={HeroImage} className="w-full h-[80%]" />
        </View>

        {/* Go Button */}
        <View className="flex items-center justify-center absolute w-32 h-32 border-black border-4 rounded-full bg-transparent">
          <TouchableOpacity>
            <View className="flex items-center justify-center bg-black w-28 h-28 rounded-full">
              <Text className="text-white text-3xl font-bold">Start</Text> 
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
