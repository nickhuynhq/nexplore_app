import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";

type discoverProps = StackNavigationProp<RootStackParamList, "Discover">;

const Discover = () => {
  const navigation = useNavigation<discoverProps>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View>
      <Text>Discover</Text>
    </View>
  );
};

export default Discover;
