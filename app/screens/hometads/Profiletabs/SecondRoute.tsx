import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons"; // Sử dụng FontAwesome5

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  // Hàm hỗ trợ để hiển thị từng mục cài đặt
  const renderSettingItem = (label: string, iconName: string, rightText: string | null = null) => (
    <TouchableOpacity style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <FontAwesome5 name={iconName as any} size={24} color="black" />
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {rightText && (
        <Text style={[styles.rightText, styles.rightTextMargin]}>
          {rightText}
        </Text>
      )}
      <MaterialIcons name="chevron-right" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Phần tiêu đề */}
      <View style={styles.header}>
        <Text style={styles.title}>Account</Text>
      </View>

      {/* Phần thông tin tài khoản */}
      <View style={styles.accountContainer}>
        <Image
          source={require("../../../../assets/images/avata.jpg")} // Thay thế với hình ảnh thực tế
          style={styles.avatar}
        />
        <View style={styles.accountDetails}>
          <Text style={styles.accountName}>Trương Thành Đạt</Text>
          <Text style={styles.accountEmail}>0971885850as@gmail.com</Text>
          <Text style={styles.accountEmail}>
          Gender: Male</Text>
          <Text style={styles.accountEmail}>
          phone number: 1234567890</Text>
          <Text style={styles.accountEmail}>
          year of birth: 26/09/2024</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Phân cách */}
      <View style={styles.divider} />

      {/* Các tùy chọn cài đặt */}
      <View style={styles.settingsContainer}>
        {renderSettingItem("Notification", "bell")}
        {renderSettingItem("Language", "globe", "English")}
        {renderSettingItem("Private", "lock")}
        {renderSettingItem("Help Center", "info-circle")}
        {renderSettingItem("About us", "question-circle")}
      </View>
      <Image
        style={styles.tinyLogo}
        source={require('../../../../assets/images/giphy (1).webp')}
      />
    </View>
  );
};


export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e10505",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    flex: 1,
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textShadowColor: "#000000", // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 1, // Shadow blur radius
  },
  accountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginRight: 15,
  },
  accountDetails: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  accountEmail: {
    fontSize: 14,
    color: "#777",
  },
  divider: {
    height: 1,
    backgroundColor: "#fa0a0a",
    marginVertical: 10,
  },
  settingsContainer: {
    backgroundColor: "transparent",
    borderRadius: 10,
    paddingVertical: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff", // Box background color
    padding: 15,
    borderRadius: 8, // Rounded corners for each setting item
    marginBottom: 20, // Spacing between boxes
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 3, // Android shadow
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingLabel: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "500",
  },
  rightText: {
    marginRight: 10,
    fontSize: 14,
    color: "#777",
  },
  rightTextMargin: {
    marginLeft: 100, // Tăng khoảng cách giữa văn bản và icon
  },
  tinyLogo:{
    width:100,
    height:120,
    alignSelf: 'flex-end'
  },
});
