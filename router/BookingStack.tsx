import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/stackParamList";
import FindTrip from "../screens/Booking/FindTrip";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BookingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FindTrip" component={FindTrip} />
    </Stack.Navigator>
  );
};

export default BookingStack;
