import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/common/Header";
import BookingStep from "./components/BookingStep";
import { Ionicons } from "@expo/vector-icons";
import APP_COLORS from "../../constants/color";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";

const ChoosePickUpDropOff = () => {
  const navigation = useNavigation<navigation<"ChoosePickUpDropOff">>();

  const [chooseType, setChooseType] = useState<"pickup" | "dropOff">("pickup");

  const pickupPoints = [
    { name: "Bến xe Miền Tây", address: "395 Kinh Dương Vương", time: "17:45" },
    {
      name: "Vòng xoay An Lạc (TP HCM)",
      address: "Vòng xoay An Lạc (TP HCM)",
      time: "17:55",
    },
    { name: "Thu phí An Sương", address: "Thu phí An Sương", time: "18:12" },
    { name: "Ngã 4 Gò Mây", address: "QL1A", time: "18:17" },
    {
      name: "Khu Công Nghiệp Vĩnh Lộc",
      address: "KCN Vĩnh Lộc, QL1A",
      time: "18:22",
    },
    { name: "Ngã 4 Bà Điểm", address: "QL1A", time: "18:25" },
  ];
  const dropOffPoints = [
    {
      name: "Hà Nội",
      address: "Hà Nội",
      time: "17:45",
    },
    {
      name: "Hải Phòng",
      address: "Hải Phòng",
      time: "17:45",
    },
    {
      name: "Đà Nẵng",
      address: "Đà Nẵng",
      time: "17:45",
    },
    {
      name: "Cần Thơ",
      address: "Cần Thơ",
      time: "17:45",
    },
    {
      name: "Hồ Chí Minh",
      address: "Hồ Chí Minh",
      time: "17:45",
    },
  ];

  const [selectedPickupPoint, setSelectedPickupPoint] = useState<
    (typeof pickupPoints)[0] | null
  >(null);

  const [selectedDropOffPoint, setSelectedDropOffPoint] = useState<
    (typeof dropOffPoints)[0] | null
  >(null);

  const handleChooseType = (type: "pickup" | "dropOff") => {
    setChooseType(type);
  };

  const handleChooseLocation = (
    type: "pickup" | "dropOff",
    point: (typeof pickupPoints)[0] | (typeof dropOffPoints)[0]
  ) => {
    if (chooseType === "pickup") {
      setChooseType("dropOff");
    }
    if (type === "pickup") {
      setSelectedPickupPoint(point);
    } else {
      setSelectedDropOffPoint(point);
    }
  };
  return (
    <View style={styles.container}>
      <Header title="Chọn điểm đón / trả" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <BookingStep currentStep={2} />
          <View style={styles.pickupSection}>
            <View>
              <TouchableOpacity
                style={[
                  styles.chooseTypeButton,
                  {
                    backgroundColor:
                      chooseType === "pickup"
                        ? APP_COLORS.aliceBlue
                        : "transparent",
                  },
                ]}
                onPress={() => handleChooseType("pickup")}
              >
                <Text style={styles.chooseTypeButtonText}>Điểm đón</Text>
                <Text style={styles.chooseTypeButtonAddress}>
                  {selectedPickupPoint?.name}
                </Text>
              </TouchableOpacity>
              {selectedPickupPoint && (
                <TouchableOpacity
                  style={[
                    styles.chooseTypeButton,
                    {
                      backgroundColor:
                        chooseType === "dropOff"
                          ? APP_COLORS.aliceBlue
                          : "transparent",
                    },
                  ]}
                  onPress={() => handleChooseType("dropOff")}
                >
                  <Text style={styles.chooseTypeButtonText}>Điểm trả</Text>
                  <Text style={styles.chooseTypeButtonAddress}>
                    {selectedDropOffPoint?.name}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.subTitle}>
              Tìm điểm {chooseType === "pickup" ? "đón" : "trả"}
            </Text>

            <View style={styles.searchBox}>
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm Tỉnh / Thành, Quận / Huyện"
                placeholderTextColor="#666"
              />
              <Ionicons
                name="search"
                size={24}
                color="#666"
                style={styles.searchIcon}
              />
            </View>

            <Text style={styles.listTitle}>
              Danh sách điểm {chooseType === "pickup" ? "đón" : "trả"}
            </Text>

            {chooseType === "pickup" &&
              pickupPoints.map((point, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.pointItem}
                  onPress={() => handleChooseLocation("pickup", point)}
                >
                  <View style={styles.pointLeft}>
                    <Ionicons
                      name="location"
                      size={24}
                      color={APP_COLORS.primary}
                    />
                    <View style={styles.pointInfo}>
                      <Text style={styles.pointName}>{point.name}</Text>
                      <Text style={styles.pointAddress}>{point.address}</Text>
                    </View>
                  </View>
                  <Text style={styles.pointTime}>{point.time}</Text>
                </TouchableOpacity>
              ))}
            {chooseType === "dropOff" &&
              dropOffPoints.map((point, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.pointItem}
                  onPress={() => handleChooseLocation("dropOff", point)}
                >
                  <View style={styles.pointLeft}>
                    <Ionicons
                      name="location"
                      size={24}
                      color={APP_COLORS.primary}
                    />
                    <View style={styles.pointInfo}>
                      <Text style={styles.pointName}>{point.name}</Text>
                      <Text style={styles.pointAddress}>{point.address}</Text>
                    </View>
                  </View>
                  <Text style={styles.pointTime}>{point.time}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.continueButtonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate("BookingInfomation")}
        >
          <Text style={styles.continueText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChoosePickUpDropOff;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pickupSection: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: APP_COLORS.primary,
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 4,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#666",
  },
  searchIcon: {
    marginLeft: 10,
  },
  listTitle: {
    fontSize: 18,

    color: "#333",
    marginBottom: 12,
  },
  pointItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  pointLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  pointInfo: {
    marginLeft: 10,
  },
  pointName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  pointAddress: {
    fontSize: 16,
    color: "#666",
  },
  pointTime: {
    fontSize: 14,
    color: "#666",
  },
  continueButton: {
    backgroundColor: APP_COLORS.primary,
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  continueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  continueButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chooseTypeButton: {
    borderRadius: 8,
    borderColor: APP_COLORS.primary,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 16,
    gap: 4,
    marginBottom: 12,
  },
  chooseTypeButtonText: {
    fontSize: 18,
    color: APP_COLORS.primary,
  },
  chooseTypeButtonAddress: {
    fontSize: 18,
  },
});
