import { View, Text } from 'react-native'
import React from 'react'
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../App';

type LocationProps = StackNavigationProp<RootStackParamList, "Location">;

const LocationDetails = () => {
  return (
    <View>
      <Text>LocationDetails</Text>
    </View>
  )
}

export default LocationDetails