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
import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

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
        <View className="relative bg-white rounded-2xl shadow-lg">
          <Image
            source={{
              uri: (data?.photo?.images?.medium?.url
                ? data?.photo?.images?.medium?.url
                : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png") as string,
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
            <View
              className={`flex-row px-2 py-1 rounded-md ${
                data?.open_now_text.substring(
                  0,
                  data?.open_now_text.indexOf(" ")
                ) === "Closed"
                  ? ` bg-red-500`
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

            {(data?.price_level || data?.price) && (
              <View className="flex-row space-x-4 items-center bg-white px-2 py-1 rounded-md">
                <Text className="text-md font-bold text-gray-600">
                  {data?.price_level}
                </Text>
                <Text className="text-xl font-bold text-gray-600">
                  {data?.price}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View className="flex-row gap-2 mt-3">
          <Text className="font-bold text-xl">{data?.name}</Text>
        </View>
        <View className="flex-row gap-1 py-1 items-center">
          <MaterialCommunityIcons name="map-marker" size={22} color="#d97706" />
          <Text className="font-semibold text-gray-500">{data?.location_string}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default LocationDetails;
