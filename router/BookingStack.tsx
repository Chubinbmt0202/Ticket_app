import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/stackParamList";
import FindTrip from "../screens/Booking/FindTrip";
import SelectSeats from "../screens/Booking/SelectSeats";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BookingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FindTrip" component={FindTrip} />
      <Stack.Screen name="SelectSeat" component={SelectSeats} />
    </Stack.Navigator>
  );
};

export default BookingStack;
