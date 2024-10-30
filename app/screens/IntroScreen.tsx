import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";

LogBox.ignoreLogs(['fontFamily "outfit" is not a system font']);
const IntroScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Go");
    }, 3000); // Hiện intro trong 3 giây

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/source.gif")}
      />
      <Image
        style={styles.image1}
        source={require("../../assets/images/200w (2).webp")}
      />
      <Text
        style={styles.test}
      >
        welcome to
      </Text>
      <Text
        style={styles.test1}
      >
        jollibee !
      </Text>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e10505",
  },
  imageContainer: {
    // borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: 300,
    height: 100,
    resizeMode: "cover",
    borderRadius: 20,
    marginBottom: 150,
    marginTop:100,
  },
  image1: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 20,
  },
  test:{
    fontSize: 40,
    color: "#FFFFFF",
    fontFamily: "outfit",
    textAlign: "center",
    fontWeight: "bold",
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 2, height: 2 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  test1:{
    fontSize: 40,
    color: "#FFFFFF",
    fontFamily: "outfit",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 280,
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 2, height: 2 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
});
