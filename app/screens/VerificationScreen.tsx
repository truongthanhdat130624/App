import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const VerificationScreen = ({ navigation }: { navigation: any }) => {
  const [code, setCode] = useState(["", "", "", ""]);

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fffdfd" />
        </Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.headerText}>Verification Email</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Please input the code sent to your email
      </Text>
      <Text style={styles.subtitle1}>
        anvil@designs.com
      </Text>
      <Image style={styles.image1}  source={require('../../assets/images/source.gif')}/>
      {/* Code Input Boxes */}
      <View style={styles.codeInputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInputBox}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleCodeChange(value, index)}
          />
        ))}
      </View>

      {/* Resend Link */}
      <Text style={styles.resendText}>
        You didn't receive an OTP? <Text style={styles.resendLink}>Resend</Text>
      </Text>

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} disabled={code.includes("")}  onPress={() => navigation.navigate("Forget1")}>

        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e10505",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  back: {
    fontSize: 20,
    marginBottom: 20,
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 2, height: 2 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color:'#ffffff',
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 2, height: 2 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  subtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle1: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 1, height: 1 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  codeInputBox: {
    backgroundColor: "#E2E0E0",
    borderRadius: 8,
    height: 50,
    width: 50,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  resendText: {
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 30,
  },
  resendLink: {
    color: "#ffffff",
    fontWeight: "bold",
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 2, height: 2 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  button: {
    backgroundColor: "#fa6a0a",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  image1: {
    width:300,
    height:100,
    marginLeft:15,
    resizeMode: "cover",
    borderRadius: 20,
    marginBottom:20,
  },
});
