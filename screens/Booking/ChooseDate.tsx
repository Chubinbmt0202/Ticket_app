import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import APP_COLORS from "../../constants/color";
import { CalendarList } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
import dayjs from "dayjs";
LocaleConfig.locales["vi"] = {
  monthNames: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  monthNamesShort: [
    "Thg 1",
    "Thg 2",
    "Thg 3",
    "Thg 4",
    "Thg 5",
    "Thg 6",
    "Thg 7",
    "Thg 8",
    "Thg 9",
    "Thg 10",
    "Thg 11",
    "Thg 12",
  ],
  dayNames: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
  dayNamesShort: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
  today: "Hôm nay",
};
LocaleConfig.defaultLocale = "vi";
const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const ChooseDate = () => {
  const navigation = useNavigation<navigation<"ChooseDate">>();

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <Image
        resizeMode="cover"
        source={require("../../assets/app_img/home_img.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Chọn ngày khởi hành thôi</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      >
        <AntDesign name="close" size={24} color={APP_COLORS.primary} />
      </TouchableOpacity>
      <View style={styles.calendarContainer}>
        <CalendarList
          style={styles.calendar}
          disableAllTouchEventsForDisabledDays={true}
          minDate={dayjs().format("YYYY-MM-DD")}
          enableSwipeMonths={true}
          theme={{
            calendarBackground: APP_COLORS.white,
            todayBackgroundColor: APP_COLORS.primary,
            todayTextColor: APP_COLORS.white,
            selectedDayBackgroundColor: APP_COLORS.primary,
            textDayStyle: {
              fontWeight: "bold",
              fontSize: 16,
            },
            dayTextColor: APP_COLORS.black,
            textDisabledColor: APP_COLORS.lightGray,
          }}
          onDayPress={(day) => {}}
          markedDates={{}}
          pastScrollRange={6}
          futureScrollRange={6}
          scrollEnabled={true}
          showScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  overlay: {
    height: (SCREEN_WIDTH * 3) / 4,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.4)",
    zIndex: 2,
    top: 0,
    width: SCREEN_WIDTH,
  },
  backgroundImage: {
    width: SCREEN_WIDTH,
    height: (SCREEN_WIDTH * 3) / 4,
    zIndex: 1,
  },
  headerContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
    flex: 1,
    height: (SCREEN_WIDTH * 3) / 4 - SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: APP_COLORS.white,
  },
  closeButton: {
    position: "absolute",
    top: SCREEN_WIDTH * 0.4,
    left: 16,
    backgroundColor: APP_COLORS.aliceBlue,
    zIndex: 3,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  calendarContainer: {
    flex: 1,
    marginTop: -SCREEN_WIDTH * 0.3,
    zIndex: 2,
    backgroundColor: APP_COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  calendar: {
    paddingTop: 16,
  },
});

export default ChooseDate;
