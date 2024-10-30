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

const SignupScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [numphone, setNumphone] = useState("");
  const [pass, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !numphone || !pass) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Email không hợp lệ!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch('http://192.168.211.161:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, numphone, pass }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Lỗi: ${errorData.message || 'Đã xảy ra lỗi! Đăng ký không thành công.'}`);
      }

      const data = await response.json();
      console.log(data);
      navigation.navigate("Signln");
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

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleForgotPasswordPress = () => {
    console.log("Forgot Password pressed!");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#ffffff" />
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>Welcome Signup!</Text>
      <Text style={styles.text1}>It's nice to have you back!</Text>
      <Image style={styles.image1} source={require('../../assets/images/source.gif')} />
      
      <Text style={styles.text2}>Username</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your username"
        placeholderTextColor="#C0C0C0"
        value={username}
        onFocus={() => setUsername("")}
        onChangeText={setUsername}
      />

      <Text style={styles.text2}>Email</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your email"
        placeholderTextColor="#C0C0C0"
        value={email}
        onFocus={() => setEmail("")}
        onChangeText={setEmail}
      />
      
      <Text style={styles.text2}>Phone Number</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your phone number"
        placeholderTextColor="#C0C0C0"
        value={numphone}
        onFocus={() => setNumphone("")}
        onChangeText={setNumphone}
        keyboardType="phone-pad"
      />

      <Text style={styles.text4}>Password</Text>
      <TextInput
        style={styles.textInput1}
        placeholder="Enter your password"
        placeholderTextColor="#C0C0C0"
        secureTextEntry={true}
        value={pass}
        onFocus={() => setPassword("")}
        onChangeText={setPassword}
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Loading..." : "Register"}
          onPress={handleRegister}
          color="#fa6a0a"
          disabled={loading}
        />
      </View>
      <View style={styles.v}>
        <Text style={styles.vtext}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signln")}>
          <Text style={styles.vtext1}>Sign In </Text>
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
      <Image style={styles.image} source={require('../../assets/images/200w.webp')} />
      <View>
        <Text style={styles.text7}>By choosing to register you agree to our</Text>
        <Text style={styles.text6}>Terms and Privacy Policy </Text>
      </View>
    </View>
  );
};

export default SignupScreen;

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
  text6: {
    fontSize: 13,
    textAlign: "center",
    color: "#000000",
    justifyContent: "center",
    fontWeight: "bold",
  },
  text7: {
    fontSize: 13,
    textAlign: "center",
    justifyContent: "center",
    color: "#FFFFFF",
  },
  buttonContainer: {
    marginTop: 10,
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
  image1: {
    width: 300,
    height: 100,
    marginLeft: 15,
    resizeMode: "cover",
    borderRadius: 20,
  },
  image: {
    width: 100,
    height: 75,
    marginLeft: 250,
    resizeMode: "cover",
    borderRadius: 20,
  },
  errorText: {
    color: "#000000",
    textAlign: "center",
    marginTop: 10,
  },
});
