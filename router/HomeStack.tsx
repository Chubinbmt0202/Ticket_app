import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import { RootStackParamList } from "../types/stackParamList";
import ChooseDate from "../screens/Booking/ChooseDate";
import { Platform } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
