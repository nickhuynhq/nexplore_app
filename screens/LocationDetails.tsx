import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  Linking,
  Platform,
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

  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  const latLng = `${data?.latitude},${data?.longitude}`;
  const label = `${data?.name}`;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-slate-50 relative">
      <ScrollView className="flex-1 px-6 py-6">
        {/* Image container */}
        <View className="relative bg-white rounded-2xl shadow-lg">
          <Image
            source={{
              uri: (data?.photo?.images?.medium?.url
                ? data?.photo?.images?.medium?.url
                : "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=") as string,
            }}
            className="w-full h-72 rounded-2xl shadow-lg"
          />

          <View className="absolute flex-row inset-x-0 top-5 justify-between px-4">
            <TouchableOpacity
              onPress={() => navigation.navigate("Discover")}
              className="w-10 h-10 rounded-md items-center justify-center bg-white"
            >
              <Entypo name="chevron-left" size={26} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 rounded-md items-center justify-center bg-pink-500">
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

            {data?.price && (
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
        <View className="flex-row space-x-2 justify-evenly items-center mt-4">
          {data?.rating && (
            <TouchableOpacity className="flex-row gap-2" onPress={() => {
              Linking.openURL(data?.write_review);
            }}>
              <View className="w-10 h-10 bg-amber-400 shadow-md rounded-md items-center justify-center">
                <FontAwesome name="star" size={24} color="white" />
              </View>
              <View className="justify-center">
                <Text className="text-gray-500 font-semibold">
                  {data?.rating}
                </Text>
                <Text className="text-gray-500">Rating</Text>
              </View>
            </TouchableOpacity>
          )}

          {data?.price_level && (
            <View className="flex-row gap-2">
              <View className="w-10 h-10 bg-green-400 shadow-md rounded-md items-center justify-center">
                <FontAwesome name="dollar" size={24} color="white" />
              </View>
              <View className="justify-center">
                <Text className="text-gray-500 font-semibold">
                  {data?.price_level}
                </Text>
                <Text className="text-gray-500">Price</Text>
              </View>
            </View>
          )}

          {data?.bearing && (
            <TouchableOpacity
              className="flex-row gap-2"
              onPress={() => {
                Linking.openURL(url as string);
              }}
            >
              <View className="w-10 h-10 bg-blue-400 shadow-md rounded-md items-center justify-center">
                <Entypo name="compass" size={24} color="white" />
              </View>
              <View className="justify-center">
                <Text className="text-gray-500 font-semibold capitalize">
                  {data?.bearing}
                </Text>
                <Text className="text-gray-500">Direction</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* About Container */}
        <View className="flex mt-6">
          <Text className="font-bold text-gray-500 text-lg">About</Text>
          <Text className="text-gray-500 text-sm mt-1">
            {data?.description ? data?.description : "No Description"}
          </Text>
        </View>

        {/* Cuisine Container */}
        <View className="flex gap-2 mt-4">
          <Text className="font-bold text-gray-500 text-lg">Categories</Text>
          <View className="flex-row flex-start gap-2 flex-wrap">
            {data?.cuisine
              ? data?.cuisine.map((cuisine: { key: number; name: string }) => (
                  <TouchableOpacity
                    key={cuisine.key}
                    className="px-3 py-1.5 bg-gray-200 rounded-2xl"
                  >
                    <Text className="font-semibold text-black">
                      {cuisine.name}
                    </Text>
                  </TouchableOpacity>
                ))
              : data?.subcategory &&
                data?.subcategory.map(
                  (subcategory: { key: number; name: string }) => (
                    <TouchableOpacity
                      key={subcategory.key}
                      className="px-3 py-1.5 bg-gray-200 rounded-2xl"
                    >
                      <Text className="font-semibold text-black">
                        {subcategory.name}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
          </View>
        </View>

        {/* Address and contact Container */}
        <View className="flex-col space-y-0.5 mt-6">
          <Text className="font-bold text-gray-500 text-lg">Contact</Text>
          {data?.phone && (
            <TouchableOpacity
              className="flex-row items-center gap-4"
              onPress={() => {
                Linking.openURL(`tel:${data?.phone}`);
              }}
            >
              <FontAwesome name="phone" size={24} color="gray" />
              <Text className="text-gray-500 font-semibold">{data?.phone}</Text>
            </TouchableOpacity>
          )}
          {data?.email && (
            <TouchableOpacity
              className="flex-row items-center  gap-4"
              onPress={() => {
                Linking.openURL(`mailto:${data?.email}`);
              }}
            >
              <MaterialCommunityIcons name="email" size={24} color="gray" />
              <Text className="text-gray-500 font-semibold">{data?.email}</Text>
            </TouchableOpacity>
          )}
          {data?.address && (
            <TouchableOpacity
              className="flex-row items-center w-full gap-4"
              onPress={() => {
                Linking.openURL(url as string);
              }}
            >
              <FontAwesome5 name="map-marked-alt" size={24} color="gray" />
              <Text className="text-gray-500 w-[85%] font-semibold">
                {data?.address}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Website and review buttons */}
        <View className="flex-row items-center justify-between mt-6 mb-10 mx-4">
          {data?.web_url && (
            <TouchableOpacity
              className="flex items-center"
              onPress={() => {
                Linking.openURL(data?.web_url);
              }}
            >
              <MaterialCommunityIcons name="web" size={24} color="gray" />
              <Text className="text-gray-500 w-full font-semibold">
                Website
              </Text>
            </TouchableOpacity>
          )}

          {data?.write_review && (
            <TouchableOpacity
              className="flex items-center"
              onPress={() => {
                Linking.openURL(data?.write_review);
              }}
            >
              <FontAwesome5 name="pencil-alt" size={24} color="gray" />
              <Text className="text-gray-500 w-full font-semibold">Review</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LocationDetails;
