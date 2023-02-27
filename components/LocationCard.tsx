import {
  View,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface LocationCardProps {
  title: string;
  imageSrc: string | undefined;
  location: string;
  data: {};
}

const LocationCard = ({
  imageSrc,
  title,
  location,
  data,
}: LocationCardProps) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("LocationDetails", { param: data })}
      className="rounded-md space-y-2 mb-3 pb-2 shadow-md min-w-0 bg-white w-[48%] "
    >
      <Image
        source={{ uri: imageSrc }}
        className="w-full h-36 rounded-t-md object-cover"
      />

      <Text className="font-bold text-md px-2">
        {title?.length > 14 ? `${title.slice(0, 15)}...` : title}
      </Text>
      <View className="flex-row items-center px-2">
        <MaterialCommunityIcons name="map-marker" size={16} color="#d97706" />
        <Text className="font-medium text-gray-600 text-xs">
          {location?.length > 14 ? `${location.slice(0, 15)}...` : location}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LocationCard;
