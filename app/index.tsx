// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   TouchableOpacity,
// } from "react-native";
// import React, { useState } from "react";

// const Index = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handlePress = () => {
//     console.log("Button pressed!");
//   };

//   const handleForgotPasswordPress = () => {
//     console.log("Forgot Password pressed!"); // Hành động khi nhấn vào Forgot Password
//     // Bạn có thể điều hướng người dùng tới trang đặt lại mật khẩu ở đây
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={handleForgotPasswordPress}>
//         <Text style={styles.back}>Back</Text>
//       </TouchableOpacity>
//       <Text style={styles.text}>Welcome Back!</Text>
//       <Text style={styles.text1}>It's nice to have you back!</Text>
//       <Text style={styles.text2}>Email</Text>
//       <TextInput
//         style={styles.textInput}
//         placeholder="Enter your email"
//         placeholderTextColor="#C0C0C0"
//         value={email}
//         onFocus={() => setEmail("")}
//         onChangeText={(text) => setEmail(text)}
//       />
//       <Text style={styles.text4}>Password</Text>
//       <TextInput
//         style={styles.textInput1}
//         placeholder="Enter your password"
//         placeholderTextColor="#C0C0C0"
//         secureTextEntry={true}
//         value={password}
//         onFocus={() => setPassword("")}
//         onChangeText={(text) => setPassword(text)}
//       />

//       {/* Dòng chữ "Forgot Password?" có thể nhấn */}
//       <TouchableOpacity onPress={handleForgotPasswordPress}>
//         <Text style={styles.text5}>Forgot Password?</Text>
//       </TouchableOpacity>

//       <View style={styles.buttonContainer}>
//         <Button title="Login" onPress={handlePress} color="#050505" />
//       </View>
//       <View style={styles.v}>
//         <Text style={styles.vtext}>Don’t have an account yet? </Text>
//         <TouchableOpacity onPress={handleForgotPasswordPress}>
//           <Text style={styles.vtext1}>Sign up </Text>
//         </TouchableOpacity>

//       </View>
//     </View>
//   );
// };

// export default Index;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#ffffff",
//     flex: 1,
//     flexDirection: "column",
//     paddingTop: 50,
//     paddingHorizontal: 20,
//   },
//   text: {
//     fontSize: 30,
//     textAlign: "left",
//     color: "#000",
//   },
//   text1: {
//     fontSize: 13,
//     textAlign: "left",
//     color: "#bcb6b6",
//   },
//   text2: {
//     fontSize: 20,
//     textAlign: "left",
//     color: "#000",
//     marginTop: 80,
//   },
//   textInput: {
//     fontSize: 10,
//     textAlign: "left",
//     color: "#000",
//     borderWidth: 2,
//     borderColor: "#bcb6b6",
//     borderRadius: 5,
//     padding: 10,
//     marginTop: 3,
//   },
//   textInput1: {
//     fontSize: 10,
//     textAlign: "left",
//     color: "#000",
//     borderWidth: 2,
//     borderColor: "#bcb6b6",
//     borderRadius: 5,
//     padding: 10,
//     marginTop: 3,
//   },
//   text4: {
//     fontSize: 20,
//     textAlign: "left",
//     color: "#000",
//     marginTop: 10,
//   },
//   text5: {
//     fontSize: 20,
//     textAlign: "left",
//     color: "#000",
//     marginTop: 5,
//   },
//   buttonContainer: {
//     marginTop: 20,
//   },
//   v: {
//     backgroundColor: "#ffffff",
//     flexDirection: "row",
//     alignSelf: "center",
//   },
//   vtext: {
//     fontSize: 13,
//     color: "#C0C0C0",
//     marginTop: 3,
//   },
//   vtext1: {
//     marginTop: 3,
//     fontSize: 15,
//     color: "#000",
//   },
//   back: {
//     fontSize: 20,
//     marginBottom: 20,
//     color:"#000000"
//   },
// });
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import SignlnScreen from "./screens/SignlnScreen";
import SignupScreen from "./screens/SignupScreen";
import GoScreen from "./screens/GoScreen";
import FirstRoute from "./screens/hometads/Profiletabs/FirstRoute";
import ForgetScreen from "./screens/ForgetScreen";
import VerificationScreen from "./screens/VerificationScreen";
import ForgetScreen1 from "./screens/ForgetScreen1";
import IntroScreen from "./screens/IntroScreen";
import CongratulationScreen from "./screens/CongratulationScreen";
import GetOrders from "./screens/GetOrders";
import OrderDetails from "./screens/OrderDetails";

const Stack = createNativeStackNavigator();
const Index = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Signln">
        <Stack.Screen
          options={{
            headerShown: false, /// bor cai pha du o tren
          }}
          name="Intro"
          component={IntroScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false, /// bor cai pha du o tren
          }}
          name="Go"
          component={GoScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false, /// bor cai pha du o tren
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false, /// bor cai pha du o tren
          }}
          name="Signup"
          component={SignupScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false, /// bor cai pha du o tren
          }}
          name="Details"
          component={DetailsScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false, /// bor cai pha du o tren
          }}
          name="Signln"
          component={SignlnScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false, /// bor cai pha du o tren
          }}
          name="Forget"
          component={ForgetScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false, /// bor cai pha du o tren
          }}
          name="Forget1"
          component={ForgetScreen1}
        />
        <Stack.Screen
          options={{
            headerShown: false, /// bor cai pha du o tren
          }}
          name="Verification"
          component={VerificationScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false, /// bor cai pha du o tren
          }}
          name="Congratulation"
          component={CongratulationScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false, /// bor cai pha du o tren
          }}
          name="GetOrders"
          component={GetOrders}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;

const styles = StyleSheet.create({});
