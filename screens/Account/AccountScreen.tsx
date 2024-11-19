import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import APP_COLORS from "../../constants/color";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
const HEADER_HEIGHT = 180;

type MenuItemProps = {
  icon: React.ReactNode;
  title: string;
  borderRadius?: {
    topLeft?: number;
    topRight?: number;
    bottomLeft?: number;
    bottomRight?: number;
  };
  onPress?: () => void;
};

const MenuItem = ({ icon, title, borderRadius, onPress }: MenuItemProps) => (
  <TouchableOpacity
    style={[
      styles.menuItem,
      borderRadius && {
        borderTopLeftRadius: borderRadius.topLeft,
        borderTopRightRadius: borderRadius.topRight,
        borderBottomLeftRadius: borderRadius.bottomLeft,
        borderBottomRightRadius: borderRadius.bottomRight,
      },
    ]}
    onPress={onPress}
  >
    <View style={styles.menuItemContent}>
      {icon}
      <Text style={styles.menuItemText}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={24} color="black" />
  </TouchableOpacity>
);

const AccountScreen = () => {
  const navigation = useNavigation<navigation<"AccountStack">>();
  const [isLogin, setIsLogin] = React.useState(false);

  const menuItems = [
    {
      icon: (
        <Ionicons
          name="information-circle-outline"
          size={24}
          color={APP_COLORS.primary}
        />
      ),
      title: "Giới thiệu nhà xe",
      borderRadius: {
        topLeft: 16,
        topRight: 16,
        bottomLeft: 16,
        bottomRight: 16,
      },
      standalone: true,
      onPress: () =>
        navigation.navigate("WebViewScreen", {
          url: "https://xetuantrung.com",
          title: "Giới thiệu nhà xe",
        }),
    },
    {
      icon: (
        <FontAwesome5 name="building" size={24} color={APP_COLORS.primary} />
      ),
      title: "Văn phòng nhà xe",
      standalone: true,
      borderRadius: {
        topLeft: 16,
        topRight: 16,
        bottomLeft: 16,
        bottomRight: 16,
      },
      onPress: () =>
        navigation.navigate("AccountStack", { screen: "GarageOffice" }),
    },
    {
      icon: <AntDesign name="setting" size={24} color={APP_COLORS.primary} />,
      title: "Cài đặt",
      borderRadius: { topLeft: 16, topRight: 16 },
      onPress: () =>
        navigation.navigate("WebViewScreen", {
          url: "https://xetuantrung.com",
          title: "Cài đặt",
        }),
    },
    {
      icon: (
        <AntDesign
          name="questioncircleo"
          size={24}
          color={APP_COLORS.primary}
        />
      ),
      title: "Hỗ trợ",
      onPress: () => navigation.navigate("AccountStack", { screen: "Support" }),
    },
    {
      icon: (
        <Ionicons
          name="mail-unread-outline"
          size={24}
          color={APP_COLORS.primary}
        />
      ),
      title: "Góp ý",
      borderRadius: { bottomLeft: 16, bottomRight: 16 },
      onPress: () =>
        navigation.navigate("WebViewScreen", {
          url: "https://xetuantrung.com",
          title: "Góp ý",
        }),
    },
  ];
  return (
    <View style={styles.container}>
      <View
        style={{
          height: HEADER_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: APP_COLORS.primary,
          flexDirection: "row",
          paddingBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            justifyContent: "space-between",
            paddingHorizontal: 24,
          }}
        >
          {!isLogin && (
            <TouchableOpacity>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: APP_COLORS.white,
                }}
              >
                Bạn chưa đăng nhập
                <Ionicons
                  name="log-in-outline"
                  size={24}
                  color={APP_COLORS.white}
                />
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: APP_COLORS.white,
                }}
              >
                Đăng nhập ngay
              </Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: APP_COLORS.gray,
            }}
          >
            <MaterialCommunityIcons
              name="account"
              size={40}
              color={APP_COLORS.white}
            />
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {menuItems.map((item, index) => (
            <React.Fragment key={item.title}>
              <MenuItem
                icon={item.icon}
                title={item.title}
                borderRadius={item.borderRadius}
                onPress={item.onPress}
              />
              {!item.standalone && index < menuItems.length - 1 && (
                <View style={styles.divider} />
              )}
              {item.standalone && <View style={styles.spacing} />}
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  content: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
    marginTop: -40,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: APP_COLORS.gray,
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: APP_COLORS.lightGray,
  },
  spacing: {
    height: 16,
  },
});

export default AccountScreen;
