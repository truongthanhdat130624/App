import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Button } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ForgetScreen1 = ({ navigation }: { navigation: any }) => {
  const handlePress = () => {
    console.log("Button pressed!");
  };

  const handleForgotPasswordPress = () => {
    console.log("Forgot Password pressed!"); // Hành động khi nhấn vào Forgot Password
    // Bạn có thể điều hướng người dùng tới trang đặt lại mật khẩu ở đây
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passworda, setPassworda] = useState("");
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fffafa" />
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>Welcome Forget!</Text>
      <Text style={styles.text1}>It's nice to have you back!</Text>
      <Image style={styles.image1}  source={require('../../assets/images/source.gif')}/>
      <Text style={styles.text2}>Password</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your password"
        placeholderTextColor="#C0C0C0"
        secureTextEntry={true}
        value={password}
        onFocus={() => setPassword("")}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={styles.text4}>Enter your password</Text>
      <TextInput
        style={styles.textInput1}
        placeholder="Enter your password"
        placeholderTextColor="#C0C0C0"
        secureTextEntry={true}
        value={passworda}
        onFocus={() => setPassworda("")}
        onChangeText={(text) => setPassworda(text)}
      />

      {/* Dòng chữ "Forgot Password?" có thể nhấn */}

      <View style={styles.buttonContainer}>
        <Button
          title="save"
          onPress={() => navigation.navigate("Congratulation")}
          color="#fa6a0a"
        />
      </View>
      <View style={styles.v}>
        <Text style={styles.vtext}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signln")}>
          <Text style={styles.vtext1}>Sign In </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.vicon}>
      </View>
      <Image style={styles.image}  source={require('../../assets/images/giphy.gif')}/>
      {/* <View>
        <Text style={styles.text7}>By choosing to register you agree to our</Text>
        <Text style={styles.text6}>Terms and Privacy Policy </Text>
      </View> */}
    </View>

    //     <View style={{backgroundColor: '#0bea0f',  flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Text style={{ fontSize:40 }}>Signln Screen</Text>
    //     <Button
    //       title="đi đến Home"
    //       onPress={() => navigation.navigate('Home')}/// replace không cho quay về
    //     />
    //      {/* <Button color={'#060505'} title="Go back" onPress={() => navigation.goBack()} />  */}
    //   </View>
  );
};

export default ForgetScreen1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e10505",
    flex: 1,
    flexDirection: "column",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 30,
    textAlign: "left",
    color: "#fffefe",
    fontWeight: "bold",
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 2, height: 2 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  text1: {
    fontSize: 13,
    textAlign: "left",
    color: "#FFFFFF",
  },
  text2: {
    fontSize: 20,
    textAlign: "left",
    color: "#FFFFFF",
    marginTop: 20,
  },
  textInput: {
    fontSize: 10,
    textAlign: "left",
    color: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    marginTop: 3,
  },
  textInput1: {
    fontSize: 10,
    textAlign: "left",
    color: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    marginTop: 3,
  },
  textInput2: {
    fontSize: 10,
    textAlign: "center",
    color: "#000",
    borderWidth: 2,
    borderColor: "#bcb6b6",
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
  },
  text4: {
    fontSize: 20,
    textAlign: "left",
    color: "#FFFFFF",
    marginTop: 10,
  },
  text5: {
    fontSize: 20,
    textAlign: "left",
    color: "#000",
    marginTop: 5,
  },
  text6: {
  
    fontSize: 13,
    textAlign: "center",
    color: "#4D4C4C",
    justifyContent:"center",
    fontWeight: "bold", 
  },
  text7: {
    marginTop:110,
    fontSize: 13,
    textAlign: "center",
    justifyContent:"center",
    color: "#bcb6b6",
  },
  buttonContainer: {
    marginTop: 20,
    fontWeight: "bold", 
  },
  v: {
    backgroundColor: "#e10505",
    flexDirection: "row",
    alignSelf: "center",
  },
  vtext: {
    fontSize: 13,
    color: "#FFFFFF",
    marginTop: 3,
  },
  vtext1: {
    marginTop: 3,
    fontSize: 15,
    color: "#ffffff",
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 1, height: 1 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  back: {
    fontSize: 20,
    marginBottom: 20,
    color: "#000000",
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 2, height: 2 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  vicon: {
    flexDirection: "column",
    marginHorizontal: 100,
  },
  iconTextWrapper: {
    flexDirection: "row", // Align icon and text horizontally
    alignItems: "center", // Center items vertically
    padding: 2, // Padding for left and right sides
    borderWidth: 2, // Border thickness
    borderColor: "#000", // Border color
    borderRadius: 15, // Rounded corners
    backgroundColor: "#f0f0f0", // Background color
    width: "100%", // Ensure the container is wide enough
    justifyContent: "center", // Center the content
    marginTop: 20, // Space above the container
  },
  icontext: {
    fontSize: 8, // Font size for the text
    marginLeft: 2, // Space between the icon and the text
    color: "#000", // Text color
    flexShrink: 1, // Prevent text from overflowing
  },
  image1: {
  width:300,
  height:100,
  marginLeft:15,
  resizeMode: "cover",
  borderRadius: 20,
  marginTop:20,
},
image: {
  width:200,
  height:200,
  marginLeft:160,
  resizeMode: "cover",
  borderRadius: 20,
  marginTop:120,
},
});

