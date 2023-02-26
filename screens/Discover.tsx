import { View, Text, Image, SafeAreaView, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { Attractions, Avatar, Hotels, Restaurants } from "../assets";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@env";
import MenuItem from "../components/MenuItem";

type discoverProps = StackNavigationProp<RootStackParamList, "Discover">;

const Discover = () => {
  const navigation = useNavigation<discoverProps>();

  const [menuSelection, setMenuSelection] = useState("resturants")

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

      <View className="flex-row items-center bg-white mx-6 mt-6 rounded-xl px-4 shadow-md">
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Search Location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details?.geometry?.viewport);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
        />
      </View>

      {/* Menu Container */}
      <ScrollView>
       
      </ScrollView>

      <View className="flex flex-row items-center justify-between px-8 mt-4">
          <MenuItem 
            key={"hotel"} 
            title="Hotels" 
            imageSrc={Hotels} 
            type={menuSelection}
            setType={setMenuSelection}
          />
          <MenuItem
            key={"resturants"}
            title="Resturants"
            imageSrc={Restaurants}
            type={menuSelection}
            setType={setMenuSelection}
          />
          <MenuItem
            key={"attraction"}
            title="Attractions"
            imageSrc={Attractions}
            type={menuSelection}
            setType={setMenuSelection}
          />
        </View>
    </SafeAreaView>
  );
};

export default Discover;
