import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Logo } from "../assets/icons";
import HeroBackground from "../components/HeroBackground";
import * as Animatable from "react-native-animatable";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

type homeScreenProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  // returns the navigation prop of the screen it's inside.
  // go to another screen, figures out the action it needs to take to do it
  const navigation = useNavigation<homeScreenProp>();

  // This is like useEffect, but is synchronous
  // This is to remove the header option at the top
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex h-full w-full bg-slate-50 relative">
      <View className="abolute z-0 w-full h-[100vh]">
        <HeroBackground />
      </View>
      <View className=" absolute w-[100vw] h-[100vh] bg-white opacity-50 "></View>

      <View className="absolute w-full h-full py-16 z-10">
        {/* Top Section */}
        <View className="flex flex-row w-full px-6">
          <Animatable.Image
            animation="bounceInLeft"
            easing="ease-in-out"
            source={Logo}
            resizeMode="contain"
            className="w-2/3 h-14"
          />
        </View>

        {/* Hero Section */}
        <View className="px-6 mt-12 space-y-3">
          <Animatable.Text
            animation="fadeInLeft"
            delay={1000}
            className="text-slate-900 text-[42px]"
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

        <View className="flex items-center justify-center h-full w-full">
          {/* Go Button */}
          <Animatable.View
            animation="fadeInUp"
            delay={1500}
            className="flex items-center justify-center absolute w-32 h-32 border-black border-4 rounded-full bg-transparent"
          >
            <TouchableOpacity onPress={() => navigation.navigate("Discover")}>
              <Animatable.View
                animation={"pulse"}
                easing="ease-in-out"
                iterationCount={"infinite"}
                className="flex items-center justify-center bg-black w-28 h-28 rounded-full"
              >
                <Text className="text-white text-3xl font-bold">Start</Text>
              </Animatable.View>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
