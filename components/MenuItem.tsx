import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

interface MenuItemProps {
  title: string;
  imageSrc: HTMLImageElement | string;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}

const MenuItem = ({ title, imageSrc, type, setType }: MenuItemProps) => {
  const handleMenuPress = () => {
    setType(title.toLocaleLowerCase());
  };
  return (
    <TouchableOpacity
      className="items-center justify-center gap-2"
      onPress={handleMenuPress}
    >
      <View
        className={`w-20 h-20 p-4 rounded-lg ${
          type === title.toLocaleLowerCase()
            ? "bg-gray-300 shadow-2xl"
            : "bg-white shadow-sm"
        }`}
      >
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={imageSrc}
        />
      </View>

      <Text className="font-semibold text-md">{title}</Text>
    </TouchableOpacity>
  );
};

export default MenuItem;
