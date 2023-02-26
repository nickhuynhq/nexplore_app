import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from "../assets";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@env";
import MenuItem from "../components/MenuItem";
import { MaterialIcons } from "@expo/vector-icons";
import ItemCard from "../components/ItemCard";

type discoverProps = StackNavigationProp<RootStackParamList, "Discover">;

const Discover = () => {
  const navigation = useNavigation<discoverProps>();

  const [menuSelection, setMenuSelection] = useState("resturants");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);

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

      {/* Search Bar */}
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

      {/* Listings Title */}
      <View className="flex-row justify-between w-full px-8 py-4">
        <Text className="font-bold text-2xl">Top Results</Text>
        <TouchableOpacity className="flex-row items-center ">
          <Text className="text-gray-400 font-semibold text-md">Explore</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Listings Container */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center pb-20">
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <ScrollView className="px-8">
          <View className="flex-row justify-between flex-wrap items-center mt-3">
            {mainData?.length > 0 ? (
              <>
                <ItemCard
                  key={1}
                  imageSrc={
                    "https://cdn.pixabay.com/photo/2023/02/08/07/32/vietnamese-woman-7775904_960_720.jpg"
                  }
                  title="Vietnam Farm fsdgsdfgdfsgdfsgd"
                  location="Vietnam"
                />
                <ItemCard
                  key={2}
                  imageSrc={
                    "https://cdn.pixabay.com/photo/2023/02/08/07/32/vietnamese-woman-7775904_960_720.jpg"
                  }
                  title="Vietnam Farm"
                  location="Vietnam"
                />
              </>
            ) : (
              <>
                <View className="flex w-full h-[300px] items-center gap-3 justify-center">
                  <Image
                    resizeMode="contain"
                    className="w-32 h-32"
                    source={NotFound}
                  />
                  <Text className="font-bold text-xl">Sorry... No Data Found</Text>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      )}

      {/* Menu Container */}
      <View className="absolute bottom-0 bg-white shadow-md h-[124px] w-full flex flex-row items-center justify-between px-10 pb-2">
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
