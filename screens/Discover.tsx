import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import {
  Attractions,
  Avatar,
  Hotels,
  NotFound,
  Restaurants,
} from "../assets/icons";
import MenuButton from "../components/MenuButton";
import LocationCard from "../components/LocationCard";
import { MaterialIcons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { GOOGLE_API_KEY } from "@env";
import { getPlacesData } from "../utils/api";
import { coordinatesInterface } from "../utils/types/types";

type discoverProps = StackNavigationProp<RootStackParamList, "Discover">;

const Discover = () => {
  const navigation = useNavigation<discoverProps>();

  const [menuSelection, setMenuSelection] = useState("hotels");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState<any[]>([]);
  const [coordinates, setCoordinates] = useState<coordinatesInterface>({
    tr: {
      lat: 43.85545793597914,
      long: -79.11689708040795,
    },
    bl: {
      lat: 43.58102453761487,
      long: -79.63921897890965,
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData({ coordinates, menuSelection }).then((data) => {
      setMainData(data);
      setIsLoading(false);
    });
  }, [coordinates, menuSelection]);

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
            setCoordinates({
              tr: {
                lat: details?.geometry?.viewport?.northeast?.lat,
                long: details?.geometry?.viewport?.northeast?.lng,
              },
              bl: {
                lat: details?.geometry?.viewport?.southwest?.lat,
                long: details?.geometry?.viewport?.southwest?.lng,
              },
            });
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
      ) : mainData.length === 0 ? (
        <View className="flex items-center justify-center flex-1 px-8 py-4 mb-10">
          <Image source={NotFound} className="w-24 h-24"/>
          <Text className="mt-4 text-xl font-bold text-gray-500">404</Text>
           <Text className="mt-2 text-lg font-semibold text-gray-500">Sorry...No results at this time.</Text>
        </View>
       
      ) : (
        <FlatList
          data={mainData}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 8,
            marginBottom: 16,
          }}
          className="flex-1 mt-2"
          renderItem={({ item }) => (
            <LocationCard
              imageSrc={
                item?.photo?.images?.medium?.url
                  ? item?.photo?.images?.medium?.url
                  : "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
              }
              title={item?.name}
              location={item?.location_string}
              data={item}
            />
          )}
        />
      )}

      {/* Menu Container */}
      <View className="absolute bottom-0 bg-white shadow-md h-[124px] w-full flex flex-row items-center justify-between px-10 pb-2">
        <MenuButton
          key={"hotels"}
          title="hotels"
          imageSrc={Hotels}
          type={menuSelection}
          setType={setMenuSelection}
        />
        <MenuButton
          key={"restaurants"}
          title="restaurants"
          imageSrc={Restaurants}
          type={menuSelection}
          setType={setMenuSelection}
        />
        <MenuButton
          key={"attractions"}
          title="attractions"
          imageSrc={Attractions}
          type={menuSelection}
          setType={setMenuSelection}
        />
      </View>
    </SafeAreaView>
  );
};

export default Discover;
