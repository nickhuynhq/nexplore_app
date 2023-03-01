import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
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

  const [menuSelection, setMenuSelection] = useState("restaurants");
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
            console.log(details?.geometry?.viewport);
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
      ) : (
        <ScrollView className="px-8">
          <View className="flex-row justify-between flex-wrap items-center mt-3">
            {mainData?.length > 0 ? (
              <>
                {mainData?.map((data, i) => {
                  if (data?.name)
                    return (
                      <LocationCard
                        key={i}
                        imageSrc={
                          data?.photo?.images?.medium?.url
                            ? data?.photo?.images?.medium?.url
                            : "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
                        }
                        title={data?.name}
                        location={data?.location_string}
                        data={data}
                      />
                    );
                })}
              </>
            ) : (
              <>
                <View className="flex w-full h-[300px] items-center gap-3 justify-center">
                  <Image
                    resizeMode="contain"
                    className="w-32 h-32"
                    source={NotFound}
                  />
                  <Text className="font-bold text-xl">
                    Sorry... No Data Found
                  </Text>
                </View>
              </>
            )}
          </View>
        </ScrollView>
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
