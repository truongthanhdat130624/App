import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SignInScreen = ({ navigation }: { navigation: any }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState(""); // Thay đổi tên biến
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!usernameOrEmail || !password) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://192.168.211.161:8080/api/users");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Đã xảy ra lỗi trong quá trình đăng nhập!");
      }

      const data = await response.json();
      // Kiểm tra cả email và username
      const user = data.content.find(
        (user: { email: string; username: string; pass: string; }) => 
          (user.email === usernameOrEmail || user.username === usernameOrEmail) && 
          user.pass === password
      );

      if (!user) {
        throw new Error("Email hoặc username hoặc mật khẩu không đúng!");
      }

      console.log("Đăng nhập thành công:", user);
      navigation.navigate("Home");
    } 
    catch (error: unknown) {
      console.error("Lỗi đăng nhập:", error);

      // Kiểm tra kiểu dữ liệu của `error` trước khi truy cập thuộc tính `message`
      let errorMessage = "Có lỗi xảy ra trong quá trình đăng nhập.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordPress = () => {
    console.log("Forgot Password pressed!");
    navigation.navigate("Forget");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#ffffff" />
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>Welcome Back!</Text>
      <Text style={styles.text1}>It's nice to have you back!</Text>
      <Image style={styles.image1} source={require('../../assets/images/source.gif')} />
      <Text style={styles.text2}>Email or Username</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your email or username"
        placeholderTextColor="#C0C0C0"
        value={usernameOrEmail}
        onChangeText={(text) => setUsernameOrEmail(text)}
      />
      <Text style={styles.text4}>Password</Text>
      <TextInput
        style={styles.textInput1}
        placeholder="Enter your password"
        placeholderTextColor="#C0C0C0"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* Hiển thị thông báo lỗi nếu có */}
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      {/* Dòng chữ "Forgot Password?" có thể nhấn */}
      <TouchableOpacity onPress={handleForgotPasswordPress}>
        <Text style={styles.text5}>Forget Password?</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Đang đăng nhập..." : "Login"}
          onPress={handleLogin}
          color="#fa6a0a"
          disabled={loading}
        />
      </View>
      <View style={styles.v}>
        <Text style={styles.vtext}>Don’t have an account yet? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.vtext1}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.vicon}>
        <TouchableOpacity onPress={handleForgotPasswordPress}>
          <View style={styles.iconTextWrapper}>
            <MaterialCommunityIcons
              name="alpha-g-circle"
              size={40}
              color="black"
            />
            <Text style={styles.icontext}>Continue with Google</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPasswordPress}>
          <View style={styles.iconTextWrapper}>
            <MaterialCommunityIcons
              name="alpha-f-circle"
              size={40}
              color="black"
            />
            <Text style={styles.icontext}>Continue with Facebook</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image style={styles.image} source={require('../../assets/images/giphy.gif')} />
    </View>
  );
};

export default SignInScreen;

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
    color: "#ffffff",
    fontWeight: "bold",
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
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
    marginTop: 10,
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
  text4: {
    fontSize: 20,
    textAlign: "left",
    color: "#FFFFFF",
    marginTop: 10,
  },
  text5: {
    fontSize: 20,
    textAlign: "left",
    color: "#FFFFFF",
    marginTop: 5,
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
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  back: {
    fontSize: 20,
    marginBottom: 20,
    color: "#000000",
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  vicon: {
    flexDirection: "column",
    marginHorizontal: 100,
  },
  iconTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    width: "100%",
    justifyContent: "center",
    marginTop: 20,
  },
  icontext: {
    fontSize: 8,
    marginLeft: 2,
    color: "#000",
    flexShrink: 1,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 20,
    marginLeft: 170,
    marginTop: 3,
  },
  image1: {
    width: 300,
    height: 100,
    marginLeft: 15,
    resizeMode: "cover",
    borderRadius: 20,
  },
  errorMessage: {
    color: "#020202",
    marginTop: 10,
  },
});
