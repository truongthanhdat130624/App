import { StyleSheet, Text, View,Image } from "react-native";
import React, { useEffect } from "react";

const CongratulationScreen = ({
    route,
    navigation,
  }: {
    route: any;
    navigation: any;
  }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.replace("Signln");
      }, 3000); // Hiện intro trong 3 giây
  
      return () => clearTimeout(timer);
    }, [navigation]);
  return (
    <View style={styles.container}>
    <Image style={styles.image}  source={require('../../assets/images/200w (3).webp')}/>
      <Text style={styles.text}>Congratulations</Text>
      <Text style={styles.text1}>changed password successfully</Text>
      <Image style={styles.image1}  source={require('../../assets/images/source.gif')}/>
    </View>
  );
};
 
export default CongratulationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ không gian
    justifyContent: "center", // Căn giữa theo chiều dọc
    alignItems: "center", // Căn giữa theo chiều ngang
    backgroundColor: "#e10505", // Màu nền
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 30, // Kích thước chữ
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 2, height: 2 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  text1: {
    color: "#FFFFFF",
    fontSize: 15, // Kích thước chữ
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 2, height: 2 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
    marginBottom:150,
  },
  image: {
    width:200,
    height:200,
    resizeMode: "cover",
    borderRadius: 20,
    marginTop:250,
  },
  image1: {
    width:300,
    height:100,
    marginLeft:15,
    resizeMode: "cover",
    borderRadius: 20,
  },
});
