import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ViewStyle,
} from "react-native";
import React, { useEffect } from "react";
import APP_COLORS from "../../constants/color";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import TripResultCard from "./components/TripResultCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
import { RootStackParamList } from "../../types/stackParamList";
import { RouteProp } from "@react-navigation/native";

type BookingScreenRouteProp = RouteProp<RootStackParamList, "BookingStack">;
const HeaderImg = require("../../assets/app_img/home_img.jpg");

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const HEADER_HEIGHT = (SCREEN_WIDTH * 3) / 4;

const SCROLL_THRESHOLD = {
  OVERLAY: 150,
  HEADER: 200,
  TITLE: 300,
  OPACITY: 100,
};

const INITIAL_HOURS = [
  { id: 1, time: 18, active: true },
  { id: 2, time: 19, active: false },
  { id: 3, time: 20, active: false },
];

const Header = ({
  scrollY,
  navigation,
  titleOpacity,
  titleTranslateY,
}: {
  scrollY: Animated.Value;
  navigation: any;
  titleOpacity: Animated.AnimatedInterpolation<number>;
  titleTranslateY: Animated.AnimatedInterpolation<number>;
}) => {
  const route = useRoute<BookingScreenRouteProp>(); // Access the route params

  // Access params from route
  useEffect(() => {
    if (route.params) {
      console.log("Params received:", route.params);
      // Example: Log each param individually (adjust according to your data structure)
      if (route.params.noiDi) {
        console.log("Start Location:", route.params.noiDi);
      }
      if (route.params.noiDen) {
        console.log("End Location:", route.params.noiDen);
      }
    } else {
      console.log("No params received");
    }
  }, [route.params]);
  return (
    <View>
      <Animated.View
        style={[
          styles.headerNav,
          {
            transform: [{ translateY: titleTranslateY }],
            opacity: titleOpacity,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Entypo name="chevron-left" size={24} color={APP_COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.headerNavContent}>
          <Text numberOfLines={2} style={styles.headerText}>
            {route.params.noiDi}
          </Text>
          <AntDesign name="arrowright" size={24} color={APP_COLORS.white} />
          <Text numberOfLines={2} style={styles.headerText}>
            {route.params.noiDen}
          </Text>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.overlay,
          {
            backgroundColor: scrollY.interpolate({
              inputRange: [0, SCROLL_THRESHOLD.OVERLAY],
              outputRange: ["rgba(255,255,255,0)", APP_COLORS.primary],
              extrapolate: "clamp",
            }),
          },
        ]}
      />
      <Image source={HeaderImg} style={styles.headerImage} />
    </View>
  );
};

const FindTrip = () => {
  const scrollViewRef = React.useRef<ScrollView>(null);
  const scrollY = React.useRef(new Animated.Value(0));
  const [hour, setHour] = React.useState(INITIAL_HOURS);
  const route = useRoute<BookingScreenRouteProp>(); // Access the route params
  const navigation = useNavigation<navigation<"BookingStack">>();

  // Access params from route
  useEffect(() => {
    if (route.params) {
      console.log("Params received:", route.params);
      // Example: Log each param individually (adjust according to your data structure)
      if (route.params.noiDi) {
        console.log("Start Location:", route.params.noiDi);
      }
      if (route.params.noiDen) {
        console.log("End Location:", route.params.noiDen);
      }
    } else {
      console.log("No params received");
    }
  }, [route.params]);

  const animatedValues = useAnimatedValues(scrollY.current);

  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: scrollY.current,
          },
        },
      },
    ],
    { useNativeDriver: false }
  );

  const handleChangeHour = (id: number) => {
    const newHour = hour.map((item) => ({
      ...item,
      active: item.id === id,
    }));
    setHour(newHour);
  };

  return (
    <View style={styles.container}>
      <Header
        scrollY={scrollY.current}
        navigation={navigation}
        titleOpacity={animatedValues.titleOpacity}
        titleTranslateY={animatedValues.titleTranslateY}
      />
      <Animated.View
        style={[
          styles.subHeader,
          {
            transform: [{ translateY: animatedValues.subHeaderTranslateY }],
            opacity: animatedValues.subtitleOpacity,
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={24} color={APP_COLORS.white} />
        </TouchableOpacity>
        <Animated.Text
          style={[
            styles.subHeaderText,
            {
              opacity: animatedValues.subtitleOpacity,
            },
          ]}
        >
          {route.params.noiDi} - {route.params.noiDen}
        </Animated.Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.mainContent,
          {
            transform: [{ translateY: animatedValues.headerTranslateY }],
          },
        ]}
      >
        <View style={styles.dateHeader}>
          <TouchableOpacity onPress={() => navigation.navigate("ChooseDate")}>
            <AntDesign name="calendar" size={24} color={APP_COLORS.white} />
          </TouchableOpacity>
          <View style={styles.dateSelector}>
            <TouchableOpacity>
              <Entypo name="chevron-left" size={24} color={APP_COLORS.white} />
            </TouchableOpacity>
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateText}>Khởi hành</Text>
              <Text style={styles.dateText}>{route.params.ngayKhoiHanh}</Text>
            </View>
            <TouchableOpacity>
              <Entypo name="chevron-right" size={24} color={APP_COLORS.white} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Filter")}>
            <Ionicons name="options" size={24} color={APP_COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.hourContainer}>
              {hour.map((item, index) => (
                <TouchableOpacity
                  onPress={() => handleChangeHour(item.id)}
                  style={getHourButtonStyle(item.active)}
                  key={index}
                >
                  {item.active && (
                    <Octicons
                      name={item.time <= 18 ? "sun" : "moon"}
                      size={14}
                      color={APP_COLORS.primary}
                    />
                  )}
                  <Text style={{ textAlign: "right" }}>{item.time}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.timeLine} />

            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              onScroll={onScroll}
              style={styles.scrollContent}
            >
              <View style={styles.tripList}>
                <View style={styles.tripGrid}>
                  <TripResultCard />
                  <TripResultCard />
                  <TripResultCard />
                  <TripResultCard />
                  <TripResultCard />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const useAnimatedValues = (scrollY: Animated.Value) => {
  return {
    headerTranslateY: scrollY.interpolate({
      inputRange: [0, SCROLL_THRESHOLD.HEADER],
      outputRange: [-SCREEN_WIDTH * 0.25, -SCREEN_WIDTH * 0.55],
      extrapolate: "clamp",
    }),
    titleTranslateY: scrollY.interpolate({
      inputRange: [0, SCROLL_THRESHOLD.TITLE],
      outputRange: [0, -60],
      extrapolate: "clamp",
    }),
    titleOpacity: scrollY.interpolate({
      inputRange: [0, SCROLL_THRESHOLD.OPACITY],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
    subtitleOpacity: scrollY.interpolate({
      inputRange: [0, SCROLL_THRESHOLD.OPACITY],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    subHeaderTranslateY: scrollY.interpolate({
      inputRange: [0, SCROLL_THRESHOLD.HEADER],
      outputRange: [SCREEN_WIDTH * 0.45, 40],
      extrapolate: "clamp",
    }),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerNav: {
    paddingTop: SCREEN_HEIGHT * 0.1,
    zIndex: 3,
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    backgroundColor: APP_COLORS.white,
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerNavContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 16,
    gap: 16,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
    color: APP_COLORS.white,
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    width: SCREEN_WIDTH,
    height: "100%",
  },
  headerImage: {
    width: SCREEN_WIDTH,
    height: HEADER_HEIGHT,
    zIndex: 1,
  },
  subHeader: {
    zIndex: 3,
    position: "absolute",
    left: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  subHeaderText: {
    fontSize: 20,
    color: APP_COLORS.white,
    marginLeft: 16,
  },
  mainContent: {
    backgroundColor: APP_COLORS.primary,
    height: 1000,
    zIndex: 2,
    borderRadius: 32,
  },
  dateHeader: {
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 24,
  },
  dateSelector: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    marginHorizontal: 16,
  },
  dateTextContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    color: APP_COLORS.white,
  },
  contentContainer: {
    backgroundColor: APP_COLORS.aliceBlue,
    zIndex: 3,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },
  hourContainer: {
    paddingTop: 16,
    width: SCREEN_WIDTH * 0.12,
    marginHorizontal: 4,
  },
  timeLine: {
    width: 1,
    backgroundColor: APP_COLORS.blue,
    marginVertical: 8,
  },
  scrollContent: {
    marginTop: 16,
  },
  tripList: {
    height: 2000,
    paddingHorizontal: 8,
  },
  tripGrid: {
    gap: 16,
  },
});

const getHourButtonStyle = (active: boolean): ViewStyle => ({
  flexDirection: "row",
  gap: 4,
  justifyContent: "flex-end",
  borderWidth: active ? 1 : 0,
  borderColor: active ? APP_COLORS.primary : "transparent",
  borderRadius: 999,
  padding: 4,
  marginVertical: 8,
  alignItems: "center",
  backgroundColor: active ? APP_COLORS.white : "transparent",
});

export default FindTrip;
