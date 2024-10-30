import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";  // Import useNavigation

const ProfileScreen = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation(); // Sử dụng useNavigation để lấy đối tượng navigation

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://192.168.211.161:8080/api/users");
        if (!response.ok) {
          throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`);
        }
        const data = await response.json();
        const userData = data.content[0];
        setUser({ username: userData.username, email: userData.email });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Reset lại navigation stack, điều hướng đến màn hình Signln
    navigation.reset({
      index: 0,
      routes: [{ name: 'Signln' }],  // Điều hướng tới màn hình Signln và xóa các màn hình khác
    });

    Alert.alert("Thông báo", "Bạn đã đăng xuất thành công");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../../../assets/images/avata.jpg')}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.username}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.menuItem} 
        onPress={() => navigation.navigate("GetOrders")}  // Điều hướng đến màn hình GetOrders
      >
        <Text style={styles.menuTitle}>My orders</Text>
        <Text style={styles.menuSubtitle}>Already have 10 orders</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuTitle}>Shipping Addresses</Text>
        <Text style={styles.menuSubtitle}>03 Addresses</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuTitle}>Payment Method</Text>
        <Text style={styles.menuSubtitle}>You have 2 cards</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuTitle}>My reviews</Text>
        <Text style={styles.menuSubtitle}>Reviews for 5 items</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuTitle}>Danger Zone</Text>
        <Text style={styles.menuSubtitle}>Notification, Password, FAQ, Contact</Text>
      </TouchableOpacity>
    
      {/* Nút đăng xuất */}
      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Text style={styles.menuTitle}>Log out</Text>
        <Text style={styles.menuSubtitle}>Sign out of your account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e10505",
    paddingHorizontal: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#cccccc",
  },
  profileInfo: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color:"#FFFFFF",
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  profileEmail: {
    fontSize: 14,
    color: "#fffafa",
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  menuItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#060606",
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#666",
  },
});
