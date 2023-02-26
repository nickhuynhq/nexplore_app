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
import * as Animatable from "react-native-animatable";

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
        <View className="flex flex-row w-full px-6 pt-6">
          <Animatable.Image
            animation="bounceInLeft"
            easing="ease-in-out"
            source={Logo}
            resizeMode="contain"
            className="w-2/3 h-14"
          />
        </View>

        {/* Hero Section */}
        <View className="px-6 mt-8 space-y-3">
          <Animatable.Text
            animation="fadeInLeft"
            delay={1000}
            className="text-slate-600 text-[42px]"
          >
            Get out there and discover your
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInLeft"
            delay={1500}
            className="text-black font-bold text-[38px]"
          >
            Next Adventure!
          </Animatable.Text>
        </View>
      </View>

      <View className="flex items-center justify-center h-full w-full relative">
        {/* Background circles */}
        <View className="h-full w-full">
          <Animatable.View
            animation="fadeInUp"
            delay={400}
            className="w-[320px] h-[320px] bg-sky-500 rounded-full absolute -right-32"
          ></Animatable.View>
          <Animatable.View
            animation="fadeInUp"
            delay={400}
            className="w-[320px] h-[320px] bg-orange-400 rounded-full absolute  bottom-60 -left-12"
          ></Animatable.View>

          <Animatable.Image
            animation="fadeInUp"
            easing="ease-in-out"
            source={HeroImage}
            className="w-full h-[80%]"
          />
        </View>

        {/* Go Button */}
        <View className="flex items-center justify-center absolute w-32 h-32 border-sky-500 border-4 rounded-full bg-transparent">
          <TouchableOpacity>
            <Animatable.View
              animation={"pulse"}
              easing="ease-in-out"
              iterationCount={"infinite"}
              className="flex items-center justify-center bg-sky-500 w-28 h-28 rounded-full"
            >
              <Text className="text-white text-3xl font-bold">Start</Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
