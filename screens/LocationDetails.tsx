import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { ReactNode, useLayoutEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { useNavigation, RouteProp } from "@react-navigation/native";
import {
  FontAwesome,
  FontAwesome5,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

type LocationProps = StackNavigationProp<RootStackParamList, "Location">;
type LocationRouteProp = RouteProp<RootStackParamList, "Location">;

interface LocationDetailsProps {
  route: LocationRouteProp;
}

const LocationDetails = ({ route }: LocationDetailsProps) => {
  const navigation = useNavigation<LocationProps>();
  const data = route?.params?.param as any;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 w-[100vw] bg-slate-50 relative">
      <ScrollView className="flex-1 w-full px-6 py-6">
        {/* Image container */}
        <View className="relative bg-white rounded-2xl shadow-lg">
          <Image
            source={{
              uri: (data?.photo?.images?.medium?.url
                ? data?.photo?.images?.medium?.url
                : "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=") as string,
            }}
            className="w-full h-72 rounded-2xl"
          />

          <View className="absolute flex-row inset-x-0 top-5 justify-between px-4">
            <TouchableOpacity
              onPress={() => navigation.navigate("Discover")}
              className="w-10 h-10 rounded-md items-center justify-center bg-white"
            >
              <Entypo name="chevron-left" size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 rounded-md items-center justify-center bg-amber-500">
              <AntDesign name="heart" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="absolute flex-col inset-x-0 bottom-5 items-start px-6 gap-2">
            {data?.open_now_text && (
              <View
                className={`flex-row px-2 py-2 rounded-md ${
                  data?.open_now_text.substring(
                    0,
                    data?.open_now_text.indexOf(" ")
                  ) === "Closed"
                    ? ` bg-black`
                    : ` bg-green-500`
                }`}
              >
                <Text className="text-white font-bold uppercase">
                  {data?.open_now_text.substring(
                    0,
                    data?.open_now_text.indexOf(" ")
                  )}
                </Text>
              </View>
            )}

            {(data?.price_level || data?.price) && (
              <View className="flex-row space-x-4 items-center bg-white px-2 py-1 rounded-md">
                <Text className="text-xl font-bold text-gray-600">
                  {data?.price}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Title and location container */}
        <View className="flex-row gap-2 mt-3">
          <Text className="font-bold text-xl">{data?.name}</Text>
        </View>
        <View className="flex-row gap-1 py-1 items-center">
          <MaterialCommunityIcons name="map-marker" size={22} color="#d97706" />
          <Text className="font-semibold text-gray-500">
            {data?.location_string}
          </Text>
        </View>

        {/* Stats Icon container */}
        <View className="flex-row space-x-2 items-center mt-2">
          {data?.rating && (
            <View className="flex-row gap-2">
              <View className="w-10 h-10 bg-amber-300 shadow-md rounded-md items-center justify-center">
                <FontAwesome name="star" size={24} color="white" />
              </View>
              <View className="justify-center">
                <Text className="text-gray-500 font-semibold">
                  {data?.rating}
                </Text>
                <Text className="text-gray-500">Rating</Text>
              </View>
            </View>
          )}

          {data?.price_level && (
            <View className="flex-row gap-2">
              <View className="w-10 h-10 bg-amber-300 shadow-md rounded-md items-center justify-center">
                <FontAwesome name="dollar" size={24} color="white" />
              </View>
              <View className="justify-center">
                <Text className="text-gray-500 font-semibold">
                  {data?.price_level}
                </Text>
                <Text className="text-gray-500">Price Level</Text>
              </View>
            </View>
          )}

          {data?.bearing && (
            <View className="flex-row gap-2">
              <View className="w-10 h-10 bg-amber-300 shadow-md rounded-md items-center justify-center">
                <Entypo name="compass" size={24} color="white" />
              </View>
              <View className="justify-center">
                <Text className="text-gray-500 font-semibold capitalize">
                  {data?.bearing}
                </Text>
                <Text className="text-gray-500">Direction</Text>
              </View>
            </View>
          )}
        </View>

        {/* About Container */}
        <View className="flex mt-6">
          <Text className="font-bold text-gray-500 text-md">About</Text>
          <Text className="text-gray-500 text-sm mt-1">
            {data?.description ? data?.description : "No Description"}
          </Text>
        </View>

        {/* Cuisine Container */}
        <View className="flex gap-2 mt-4">
          <Text className="font-bold text-gray-500 text-md">Categories</Text>
          <View className="flex-row flex-start gap-2 flex-wrap">
            {data?.cuisine.map((cuisine: { key: number; name: string }) => (
              <TouchableOpacity
                key={cuisine.key}
                className="px-3 py-1.5 bg-gray-200 rounded-2xl"
              >
                <Text className="font-semibold text-black">{cuisine.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Address and contact Container */}
        <View className="flex-col space-y-0.5 mt-6">

          {data?.phone && (
            <View className="flex-row gap-3">
              <FontAwesome name="phone" size={24} color="gray" />
              <Text className="text-gray-500 font-semibold">{data?.phone}</Text>
            </View>
          )}
          {data?.email && (
            <View className="flex-row gap-3">
              <MaterialCommunityIcons name="email" size={24} color="gray" />
              <Text className="text-gray-500 font-semibold">{data?.email}</Text>
            </View>
          )}
          {data?.phone && (
            <View className="flex-row w-full gap-3">
              <FontAwesome5 name="map-marked-alt" size={24} color="gray" />
              <Text className="text-gray-500 w-full font-semibold">
                {data?.address}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LocationDetails;
