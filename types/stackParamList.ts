import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  RootTab: undefined;
  Notification: undefined;
  TicketStack: undefined;
  BookingStack: {
    screen?: string;
    noiDen: string;
    noiDi: string;
    ngayKhoiHanh: string;
  };
  FindTrip: {
    noiDen: string;
    noiDi: string;
    ngayKhoiHanh: string;
  };
  Home: {
    noiDen: string;
    noiDi: string;

  };
  TicketInfo: undefined;
  News: undefined;
  ChooseLocationUser: {
    noiDen: string;
    noiDi: string;
  };
  ChooseDate: {
    type: "oneway" | "roundtrip";
  };
  Ticket: undefined;
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
  LoginStack: {
    screen?: string;
  };
  EnterPhoneNumber: { phoneNumber: string };
  VerifyOTP: { otpReceive: string, phoneNumber: string};
  Account: {phoneNumber: string};
  EditProfile: undefined;
  Coupon: undefined;
  ChooseLocation: {
    type: "origin" | "destination";
    noiDen: string;
    noiDi: string;
  };
  SelectSeat: undefined;
  Filter: undefined;
  PickUpDropOffFilter: {
    type: "pickup" | "dropoff";
  };
  ChoosePickUpDropOff: undefined;
  BookingInfomation: undefined;
  PaymentMethod: undefined;
  Payment: undefined;
  VerifyPayment: undefined;
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
