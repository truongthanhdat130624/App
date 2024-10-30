import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProductItem from "./items/ProductItem";
import CategoriItem from "./items/CategoriItem";

const Notifications = ({ navigation }: { navigation: any }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const handleSelectCategory = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
  };

  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <ScrollView style={styles.container}>
      {/* Phần đầu */}
      <View style={styles.header}>
        <Text style={styles.title}>Menu</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="bell-badge-outline"
            color={"#333333"}
            size={30}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Text giảm giá */}
      <View style={styles.discountContainer}>
        <Text style={styles.discountText}>Discount 20%</Text>
        <Text style={styles.specialText}>Special for you</Text>
      </View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons
          name="magnify"
          color="#000"
          size={24}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.input, { fontWeight: "bold" }]}
          placeholder="Search"
          placeholderTextColor="#000000"
          value={searchQuery}
          onChangeText={setSearchQuery} // Cập nhật trạng thái truy vấn tìm kiếm
        />
      </View>

      {/* Tabs (Cuộn ngang) */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.tabScrollContainer}
      >
        <CategoriItem onSelectCategory={handleSelectCategory} />
      </ScrollView>

      {/* Products */}
      <View style={styles.productGrid}>
        <ProductItem
          navigation={navigation}
          selectedCategoryId={selectedCategoryId}
          searchQuery={searchQuery}  // Truyền truy vấn tìm kiếm vào đây
        />
      </View>
    </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#e10505",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 130,
    color: "#FFFFFF",
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 2, height: 2 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  icon: {
    color: "#FFFFFF",
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 2, height: 2 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  discountContainer: {
    paddingHorizontal: 20,
  },
  discountText: {
    color: "#e10505",
    fontSize: 14,
    fontWeight: "bold",
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 1, height: 1 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  specialText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
    textShadowColor: "#e10505", // Màu sắc của viền
    textShadowOffset: { width: 1, height: 1 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  searchInput: {
    fontSize: 15,
    textAlign: "left",
    color: "#000000",
    borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
    paddingLeft: 40,
  },
  tabScrollContainer: {
    marginVertical: 10,
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2, // Set the width of the border
    borderColor: "#000000", // Set the color of the border
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ff0000",
    textShadowColor: "#000", // Màu sắc của viền
    textShadowOffset: { width: 1, height: 1 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  productCard: {
    width: 160,
    height: 230,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 10,
  },
  productInfoContainer: {
    paddingHorizontal: 20,
  },
  productInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#000000",
  },
  productPrice: {
    fontSize: 12,
    color: "#888",
  },
  productImage: {
    width: 140,
    height: 180,
    borderRadius: 10,
  },
  t: {
    marginBottom: 60,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e10505",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingHorizontal: 10,

    padding: 10,
    marginHorizontal: 20,
    shadowColor: "#000", // Cor da sombra
    shadowOffset: { width: 2, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.25, // Opacidade da sombra
    shadowRadius: 3.84, // Raio de desfoque da sombra
    elevation: 5, // Propriedade de elevação (para Android)
  },
  searchIcon: {
    marginRight: 10, // Espaçamento entre ícone e TextInput
  },
  input: {
    flex: 1, // Ocupa o espaço restante
    fontSize: 15,
    color: "#000",
  },
});
