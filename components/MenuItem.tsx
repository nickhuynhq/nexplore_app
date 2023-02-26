import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

interface MenuItemProps {
  title: string;
  imageSrc: ImageSourcePropType | undefined;
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
            ? "bg-gray-300 shadow-lg"
            : "bg-white shadow-lg"
        }`}
      >
        <Image
          className="w-full h-full"
          resizeMode="contain"
          source={imageSrc}
        />
      </View>

      <Text
        className={`${
          type === title.toLocaleLowerCase() ? "font-bold" : "font-medium"
        } text-md`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;
