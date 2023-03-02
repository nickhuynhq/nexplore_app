import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

interface MenuButtonProps {
  title: string;
  imageSrc: ImageSourcePropType | undefined;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}

const MenuButton = ({ title, imageSrc, type, setType }: MenuButtonProps) => {
  const handleMenuPress = () => {
    setType(title.toLocaleLowerCase());
  };
  return (
    <TouchableOpacity
      className="items-center justify-center gap-2"
      onPress={handleMenuPress}
    >
      <View
        className={`w-16 h-16 p-4 rounded-lg ${
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
        } text-md capitalize`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuButton;
