import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OrderApprovedScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#000000" />
        </Text>
      </TouchableOpacity>
      <Image
        style={styles.image1}
        source={require("../../assets/images/source.gif")}
      />
      <View style={styles.container1}>
        <Image
          style={styles.image}
          source={require("../../assets/images/200w (4).webp")}
        />
        <Text style={styles.text}>Order Approved</Text>
        <Text style={styles.text1}>
          Proceed to check your delivery status and also go ahead to place a new
          order.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.placeOrderButtonText}>about shopping cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderApprovedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ không gian
    justifyContent: "center", // Căn giữa theo chiều dọc
    alignItems: "center", // Căn giữa theo chiều ngang
    backgroundColor: "#f8f8f8", // Màu nền
  },
  container1: {
    flex: 1, // Chiếm toàn bộ không gian
    justifyContent: "center", // Căn giữa theo chiều dọc
    alignItems: "center", // Căn giữa theo chiều ngang
    backgroundColor: "#f8f8f8", // Màu nền
    marginHorizontal: 40,
  },
  text: {
    fontSize: 25,
    color: "#000000",
    textAlign: "center", // Căn giữa văn bản theo chiều ngang
    textShadowColor: "#e10505", // Màu sắc của viền
    textShadowOffset: { width: 1, height: 1 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  text1: {
    fontSize: 14,
    color: "#e10505",
    textAlign: "center", // Căn giữa văn bản theo chiều ngang
    marginTop: 10, // Tạo khoảng cách giữa các đoạn văn bản
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 1, height: 1 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
    marginBottom: 80,
  },
  placeOrderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  placeOrderButton: {
    backgroundColor: "#fa6a0a",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: 350, // Độ rộng cố định
    alignSelf: "center", // Căn giữa nút theo chiều ngang
    marginBottom: 50,
  },
  back: {
    fontSize: 20,
    marginBottom: 20,

    textShadowColor: "#e10505", // Màu sắc của viền
    textShadowOffset: { width: 1, height: 1 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
    marginRight: 300,
    marginTop: 35,
  },
  image1: {
    width: 300,
    height: 100,
    marginLeft: 15,
    resizeMode: "cover",
    borderRadius: 20,
  },
  image: {
    width: 250,
    height: 200,
    marginBottom: 50,
    resizeMode: "cover",
    borderRadius: 20,
  },
});
