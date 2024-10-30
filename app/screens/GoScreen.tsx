import { StyleSheet, Text, View, Button, Image } from "react-native";
import React from "react";

const GoScreen = ({ navigation }: { navigation: any }) => {
  return (
    
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Logo-Jollibee-445x400.webp")}
        style={styles.profileImage1}
      />
      <Image
        source={require("../../assets/images/Logo-Jollibee-445x400.webp")}
        style={styles.profileImage2}
      />
      <Image
        source={require("../../assets/images/Logo-Jollibee-445x400.webp")} //require là hình đao về và uri ngược lại
        style={styles.profileImage}
      />
      <Text style={styles.text}>Pick from a wide range of food categories</Text>
      <Text style={styles.text1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Get started"
          onPress={() => navigation.navigate("Signln")}
          color="#fa6a0a"
        />
      </View>
      <View style={styles.buttonContainer1}>
        <Button
          title="Sign up"
          onPress={() => navigation.navigate("Signup")}
          color="#E2E0E0"
        />
      </View>
    </View>
  );
};

export default GoScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e10505",//fa6a0a màu cam
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 70,
  },
  text1: {
    fontSize: 10,
    color: "#FFFFFF",
    paddingHorizontal: 20,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 120,
    paddingHorizontal: 40,
  },
  buttonContainer1: {
    marginTop: 10,
    paddingHorizontal: 40,
  },
  profileImage: {
    width: 300,
    height: 300,
    // marginTop: 100,
    marginLeft: 40,
    borderRadius: 150,
    backgroundColor: "#cccccc",
  },
  profileImage1: {
    width: 60,
    height: 60,

    marginLeft: 20,
    borderRadius: 150,
    backgroundColor: "#cccccc",
  },
  profileImage2: {
    width: 60,
    height: 60,
    marginLeft: 300,
    borderRadius: 150,
    backgroundColor: "#cccccc",
  },
});
