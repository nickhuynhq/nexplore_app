import { View, Text } from 'react-native';
import React, { ReactNode, useLayoutEffect } from 'react';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../App';
import { useNavigation, RouteProp } from "@react-navigation/native";

type LocationProps = StackNavigationProp<RootStackParamList, "Location">;
type LocationRouteProp = RouteProp<RootStackParamList, "Location">;

interface LocationDetailsProps {
  route: LocationRouteProp;
}

const LocationDetails = ({ route }: LocationDetailsProps) => {
  const navigation = useNavigation();
  const data = route?.params?.param;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  console.log(data)

  return (
    <View>
      <Text>LocationDetails</Text>
    </View>
  );
};

export default LocationDetails;
