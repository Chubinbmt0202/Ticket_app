import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import APP_COLORS from "../../constants/color";
import Ionicons from "@expo/vector-icons/Ionicons";
const HEADER_HEIGHT = 100;

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Thông báo</Text>
          <TouchableOpacity style={styles.checkButton}>
            <Ionicons name="checkmark-done-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons
              name="search"
              size={24}
              color="black"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Nhập từ khoá"
              placeholderTextColor={APP_COLORS.lightGray}
              style={styles.searchInput}
            />
          </View>
        </View>
        <View style={styles.emptyStateContainer}>
          <Image
            source={require("../../assets/app_img/warning.png")}
            style={styles.warningImage}
          />
          <View style={styles.emptyStateContent}>
            <Text style={styles.emptyStateText}>Không có thông báo nào</Text>
            <TouchableOpacity>
              <Text style={styles.updateText}>Cập nhật</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.primary,
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: APP_COLORS.primary,
    justifyContent: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerTitle: {
    color: APP_COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  checkButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_COLORS.white,
    borderRadius: 999,
    position: "absolute",
    right: 32,
  },
  content: {
    marginTop: -20,
    zIndex: 2,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: APP_COLORS.white,
    flex: 1,
  },
  searchContainer: {
    marginHorizontal: 16,
    borderRadius: 16,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
  },
  searchIcon: {
    position: "absolute",
    left: 8,
    top: 8,
  },
  searchInput: {
    borderColor: APP_COLORS.lightGray,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    flex: 1,
    paddingLeft: 40,
    fontSize: 16,
    height: 40,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  warningImage: {
    width: 150,
    height: 150,
  },
  emptyStateContent: {
    alignItems: "center",
    gap: 16,
    marginTop: 32,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  updateText: {
    color: APP_COLORS.primary,
    fontSize: 16,
  },
});

export default NotificationScreen;
