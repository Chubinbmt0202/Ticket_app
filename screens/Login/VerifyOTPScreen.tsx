import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import APP_COLORS from "../../constants/color";
import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function VerifyOTPScreen() {
  const navigation = useNavigation<navigation<"AccountStack">>();
  const route = useRoute<RouteProp<{ params: { otpReceive: string, phoneNumber: string } }>>();
  const { otpReceive, phoneNumber } = route.params;
  console.log("OTP received: ", otpReceive);

  // Cập nhật state otp từ otpReceive
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<TextInput[]>([]);

  const onChangeText = (index: number, text: string) => {
    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[index] = text.slice(0, 1);
      return newOtp;
    });

    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join(""); // Gộp các ký tự OTP
    if (enteredOtp === otpReceive) {
      navigation.navigate("Account", {phoneNumber}); // Chuyển đến màn hình tài khoản nếu OTP chính xác
    } else {
      console.log("OTP không chính xác");
    }
  };

  useEffect(() => {
    // Tự động điền OTP vào các ô khi nhận được otpReceive
    if (otpReceive) {
      const otpArray = otpReceive.split(""); // Chuyển chuỗi OTP thành mảng
      setOtp(otpArray); // Cập nhật mảng otp
    }
    inputRefs.current[0]?.focus(); // Đặt con trỏ vào ô đầu tiên khi màn hình load
  }, [otpReceive]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={APP_COLORS.black} />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Xác thực số điện thoại</Text>
          <Text style={styles.description}>
            Vui lòng nhập mã bảo mật gồm 6 chữ số mà chúng tôi vừa gửi cho bạn vào số điện thoại.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          {otp.map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => inputRefs.current[index] = ref}
              value={otp[index]}
              onChangeText={(text) => onChangeText(index, text)}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Xác thực</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resendContainer}>
          <TouchableOpacity style={styles.termsAndConditionsContainer}>
            <Text style={styles.termsAndConditions}>Gửi lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.primary,
  },
  content: {
    flex: 1,
    marginTop: 48,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: APP_COLORS.white,
    paddingHorizontal: 16,
  },
  header: {
    marginVertical: 16,
  },
  titleContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: APP_COLORS.black,
  },
  description: {
    fontSize: 15,
    color: APP_COLORS.lightGray,
    marginTop: 8,
  },
  inputContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: APP_COLORS.lightGray,
    borderRadius: 16,
    fontSize: 16,
    width: 50,
    textAlign: "center",
    paddingVertical: 10,
  },
  buttonContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: APP_COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: APP_COLORS.white,
    textAlign: "center",
  },
  resendContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  termsAndConditions: {
    fontSize: 16,
    color: APP_COLORS.primary,
  },
  termsAndConditionsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
