import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  RootTab: undefined;
  Notification: undefined;
  TicketStack: undefined;
  BookingStack: undefined;
  FindTrip: undefined;
  Home: undefined;
  TicketInfo: undefined;
  News: undefined;
  ChooseDate: undefined;
  Ticket: undefined;
  Account: undefined;
  WebViewScreen: {
    url: string;
    title: string;
  };
  GarageOffice: undefined;
  Setting: undefined;
  Support: undefined;
  Feedback: undefined;
  AccountStack: {
    screen?: string;
  };
};

export type RootStackProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

export type navigation<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type route<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
