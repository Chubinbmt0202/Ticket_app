import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import React from "react";
import APP_COLORS from "../../constants/color";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import RecentlySearchCard from "./components/RecentlySearchCard";
import NewCard from "./components/NewCard";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
import tinycolor from "tinycolor2";
const HomeImg = require("../../assets/app_img/home_img.jpg");

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const HomeScreen = () => {
  const scrollViewRef = React.createRef<ScrollView>();

  const [isOneWay, setIsOneWay] = React.useState(true);

  const scrollY = React.useRef(new Animated.Value(0));

  const navigation = useNavigation<navigation<"RootTab">>();
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

  const imageOverlayColor = scrollY.current.interpolate({
    inputRange: [0, SCREEN_WIDTH * 0.6],
    outputRange: ["rgba(255,255,255,0.2)", "rgba(255,255,255,1)"],
    extrapolate: "extend",
  });

  return (
    <View style={styles.container}>
      <View style={styles.homeImgWrapper}>
        <Animated.View
          style={{
            ...styles.homeImgOverlay,
            backgroundColor: imageOverlayColor,
          }}
        />
        <Image source={HomeImg} style={styles.homeImg} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={onScroll}
        style={styles.scrollView}
      >
        <View style={styles.wellcomeText}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Xin chào Admin
          </Text>
          <Text style={{ fontSize: 16, marginTop: 5 }}>
            Bạn đã sãn sàng cho chuyến hành trình của riêng mình?
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.locationCard}>
            <View style={styles.locationIconContainer}>
              <Feather name="circle" size={20} color={APP_COLORS.primary} />
              <View style={styles.locationDivider} />
              <Feather name="map-pin" size={20} color={APP_COLORS.primary} />
            </View>
            <View style={styles.locationTextContainer}>
              <TouchableOpacity
                style={styles.locationTextContainer}
                onPress={() =>
                  navigation.navigate("ChooseLocation", {
                    type: "origin",
                  })
                }
              >
                <Text style={{ color: APP_COLORS.lightGray }}>Nơi đi</Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "900",
                  }}
                >
                  Buôn Ma Thuột
                </Text>
              </TouchableOpacity>
              <View
                style={{ height: 1, backgroundColor: APP_COLORS.lightGray }}
              />
              <TouchableOpacity
                style={styles.locationTextContainer}
                onPress={() =>
                  navigation.navigate("ChooseLocation", { type: "destination" })
                }
              >
                <Text style={{ color: APP_COLORS.lightGray }}>Nơi đến</Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "900",
                  }}
                >
                  Hồ Chí Minh
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.switchButtonContainer}>
              <TouchableOpacity style={styles.iconButton}>
                <FontAwesome6
                  name="arrow-right-arrow-left"
                  size={20}
                  color={APP_COLORS.white}
                  style={styles.rotatedIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.datePickerContainer}>
            <View style={styles.datePickerTextContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ChooseDate", { type: "oneway" })
                }
                style={styles.datePickerButton}
              >
                <Text style={styles.lightGrayText}>Ngày khởi hành</Text>
                <Text style={styles.dateText}>17/11/2024</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.centerContainer}>
              <TouchableOpacity
                onPress={() => setIsOneWay(true)}
                style={{
                  backgroundColor: isOneWay
                    ? tinycolor(APP_COLORS.primary).setAlpha(0.3).toRgbString()
                    : APP_COLORS.gray,
                  ...styles.oneWayButton,
                }}
              >
                <Text
                  style={{
                    color: isOneWay ? APP_COLORS.primary : APP_COLORS.black,
                    fontSize: 12,
                  }}
                >
                  Một chiều
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsOneWay(false)}
                style={{
                  ...styles.roundTripButton,
                  backgroundColor: !isOneWay
                    ? tinycolor(APP_COLORS.primary).setAlpha(0.3).toRgbString()
                    : APP_COLORS.gray,
                }}
              >
                <Text
                  style={{
                    color: !isOneWay ? APP_COLORS.primary : APP_COLORS.black,
                    fontSize: 12,
                  }}
                >
                  Khứ hồi
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {!isOneWay && (
            <View style={styles.datePickerContainer}>
              <View style={styles.datePickerTextContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ChooseDate", { type: "roundtrip" })
                  }
                  style={styles.datePickerButton}
                >
                  <Text style={styles.lightGrayText}>Ngày về</Text>
                  <Text style={styles.dateText}>17/11/2024</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("BookingStack")}
            style={styles.searchButton}
          >
            <Text style={styles.searchButtonText}>Tìm chuyến đi</Text>
          </TouchableOpacity>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tìm kiếm gần đây</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>Xoá tất cả</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: SCREEN_WIDTH * 0.075,
                paddingBottom: 16,
              }}
            >
              <View style={{ marginTop: 16, flexDirection: "row", gap: 16 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <RecentlySearchCard key={i} />
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tin tức</Text>
              <TouchableOpacity onPress={() => navigation.navigate("News")}>
                <Text style={styles.viewAllText}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: SCREEN_WIDTH * 0.075,
                paddingBottom: 16,
              }}
            >
              <View style={{ marginTop: 16, flexDirection: "row", gap: 16 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <NewCard key={i} />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeImg: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.75,
  },
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  homeImgWrapper: {
    zIndex: 1,
    position: "absolute",
  },
  homeImgOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  wellcomeText: {
    position: "absolute",
    top: SCREEN_WIDTH * 0.2,
    textAlign: "center",
    maxWidth: SCREEN_WIDTH * 0.75,
    left: SCREEN_WIDTH * 0.1,
    zIndex: 2,
  },
  scrollView: {
    zIndex: 2,
  },
  contentContainer: {
    height: 2000,
    top: SCREEN_WIDTH * 0.6,
  },
  locationCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: APP_COLORS.white,
    height: 120,
    zIndex: 99,
    elevation: 8,
    borderRadius: 10,
    marginHorizontal: SCREEN_WIDTH * 0.075,
    paddingHorizontal: 16,
  },
  locationIconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  locationDivider: {
    flex: 0.5,
    width: 1,
    backgroundColor: APP_COLORS.primary,
  },
  locationTextContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
  },
  switchButtonContainer: {
    justifyContent: "center",
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  rotatedIcon: {
    transform: [{ rotate: "90deg" }],
  },
  footer: {
    height: 100,
    backgroundColor: APP_COLORS.white,
    width: SCREEN_WIDTH,
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: APP_COLORS.white,
    height: 60,
    marginHorizontal: SCREEN_WIDTH * 0.075,
    zIndex: 99,
    elevation: 8,
    borderRadius: 10,
    marginTop: 16,
  },
  datePickerTextContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
  },
  datePickerButton: {
    flex: 1,
    justifyContent: "center",
  },
  lightGrayText: {
    color: APP_COLORS.lightGray,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  centerContainer: {
    justifyContent: "center",
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  oneWayButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
    width: 64,
  },
  roundTripButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
    width: 64,
  },
  calendarButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  searchButton: {
    marginTop: 16,
    marginHorizontal: SCREEN_WIDTH * 0.075,
    height: 50,
    backgroundColor: APP_COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  searchButtonText: {
    color: APP_COLORS.white,
    fontWeight: "400",
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: SCREEN_WIDTH * 0.075,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAllText: {
    color: APP_COLORS.primary,
    fontSize: 16,
  },
});
