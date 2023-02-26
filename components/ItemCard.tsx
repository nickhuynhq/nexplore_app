import {
  View,
  Text,
  ImageSourcePropType,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ItemCardProps {
  title: string;
  imageSrc: string | undefined;
  location: string;
}

const ItemCard = ({ imageSrc, title, location }: ItemCardProps) => {
  return (
    <TouchableOpacity className="rounded-md space-y-2 pb-2 shadow-md min-w-0 bg-white w-[48%] ">
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

export default ItemCard;
