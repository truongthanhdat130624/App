import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ForgetScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#ffffff" />
        </Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Forgot Password</Text>
      </View>
      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Select which medium we should use to reset your password
      </Text>
      <Image
        style={styles.image1}
        source={require("../../assets/images/source.gif")}
      />
      {/* Email Option */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("Verification")}
      >
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="email" size={24} color="black" />
        </View>
        <Text style={styles.optionText}>Email</Text>
      </TouchableOpacity>

      {/* Phone Option */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("Verification")}
      >
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="phone" size={24} color="black" />
        </View>
        <Text style={styles.optionText}>Phone number</Text>
      </TouchableOpacity>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Signln")}
      >
        <Text style={styles.buttonText}>come back</Text>
      </TouchableOpacity>
     
    </View>
  );
};

export default ForgetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e10505",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#ffffff",
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 2, height: 2 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  subtitle: {
    fontSize: 13,
    color: "#FFFFFF",
    marginBottom: 30,
    marginLeft: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E2E0E0",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "500",
    color: "#000",
  },
  button: {
    backgroundColor: "#fa6a0a",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  back: {
    fontSize: 30,
    textAlign: "left",
    marginBottom:20,
    color: "#ffffff",
    fontWeight: "bold",
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  image1: {
    width: 300,
    height: 100,
    marginLeft: 15,
    resizeMode: "cover",
    borderRadius: 20,
    marginBottom: 20,
  },
});
