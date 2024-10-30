import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProductItem from "./items/ProductItem";

const banners = [
  {
    id: "1",
    image: require("../../../assets/images/banner_web_csr.jpg"),
    title: "Pepper soup recipe",
    subtitle: "Discount 20%",
  },
  {
    id: "2",
    image: require("../../../assets/images/banner_website_4142x1713px-01_2.jpg"),
    title: "The chicken is delicious",
    subtitle: "Buy at half price!",
  },
  {
    id: "3",
    image: require("../../../assets/images/banner_web_2.jpg"),
    title: "Vegetable salad",
    subtitle: "Fresh and healthy!",
  },
];

const Feed = ({ navigation }: { navigation: any }) => {
  const { width } = useWindowDimensions();
  const scrollViewRef = useRef<FlatList>(null); // Xác định kiểu FlatList
  const bannerIndex = useRef(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      bannerIndex.current = (bannerIndex.current + 1) % banners.length;
      if (scrollViewRef.current) {
        // Kiểm tra xem scrollViewRef.current đã được định nghĩa chưa
        scrollViewRef.current.scrollToIndex({
          index: bannerIndex.current,
          animated: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.txt1}>Home</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="bell-badge-outline"
            color={"#333333"}
            size={30}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

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
          onChangeText={(text) => setSearchQuery(text)} // Cập nhật searchQuery khi người dùng nhập
        />
      </View>
      <View style={styles.innerRectangle2} />
      <View style={styles.innerRectangle1} />
      <View style={styles.innerRectangle} />
      {/* Thẻ giao hàng */}
      <ImageBackground
        source={require("../../../assets/images/banner_web_com_ga-compressed.jpg")}
        style={styles.cardBackground1}
        imageStyle={styles.cardBackgroundImage}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery to home</Text>
          <Text style={styles.cardSubtitle}>
          Please provide your home address
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Set Location</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Banners cuộn ngang */}
      <FlatList
        horizontal
        data={banners}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ImageBackground
            source={item.image}
            style={[styles.cardBackground, { width: width * 0.8 }]}
            imageStyle={styles.cardBackgroundImage}
          >
            <View style={styles.card1}>
              <Text style={styles.cardTitle1}>{item.title}</Text>
              <Text style={styles.cardSubtitle1}>{item.subtitle}</Text>
              <TouchableOpacity style={styles.button1}>
                <Text style={styles.buttonText1}>Order Now</Text>
              </TouchableOpacity>
              <Image
                source={require("../../../assets/images/1.png")}
                style={styles.profileImage}
              />
            </View>
          </ImageBackground>
        )}
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.8}
        decelerationRate="fast"
      />

      {/* Danh sách sản phẩm cuộn ngang */}
      <Text style={styles.sectionTitle}>Top picks (5)</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.tabScrollContainer}
      >
        <ProductItem
          navigation={navigation}
          limit={5}
          selectedCategoryId={null}
          searchQuery={searchQuery}
        />
      </ScrollView>
    </View>
  );
};

export default Feed;


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    flexDirection: "column",
  },
  container1: {
    backgroundColor: "#e10505",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  txt1: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 130,
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  icon: {
    color: "#FFFFFF",
    marginLeft: 100,
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e10505",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
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
  cardBackground1: {
    backgroundColor: "#4D4C4C",
    borderRadius: 30,
    padding: 20,
    marginHorizontal: 26,
    paddingBottom: 50,
    paddingTop: 35,
    marginTop: 25,
    textAlign: "left",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 19,
    color: "#000000",
    fontWeight: "bold",
    textShadowColor: "#ffffff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#000000",
    marginBottom: 15,
    fontWeight: "bold",
    textShadowColor: "#ffea00",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  button: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  buttonText: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "bold",
    textShadowColor: "#fa0a0a",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  card1: {
    position: "relative",
  },
  cardTitle1: {
    fontSize: 19,
    color: "#FFFFFF",
    fontWeight: "bold",
    textShadowColor: "#fa0a0a",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  cardSubtitle1: {
    fontSize: 13,
    color: "#FFFFFF",
    marginBottom: 15,
    fontWeight: "bold",
    textShadowColor: "#fa0a0a",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  button1: {
    backgroundColor: "#fa0a0a",
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  buttonText1: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
  },
  productItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    height: 250,
    marginRight: 15,
    width: 160,
    marginBottom: 50,
  },
  productImage: {
    width: 140,
    height: 180,
    borderRadius: 10,
  },
  productName: {
    fontSize: 13,
    marginTop: 5,
    marginLeft: 5,
    fontWeight: "bold",
    textAlign: "left",
  },
  productPrice: {
    fontSize: 12,
    color: "#888",
    marginLeft: 5,
    textAlign: "left",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginLeft: 35,
    marginBottom: 5,
    textShadowColor: "#e10505", // Màu sắc của viền
    textShadowOffset: { width: 1, height: 1 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  productList: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  cardBackground: {
    backgroundColor: "#C3C3C3",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 38,
    paddingBottom: 40,
    paddingTop: 30,
    height: 170,
    marginTop: 45,
    textAlign: "left",
    alignItems: "flex-start",
    position: "relative", // Đảm bảo hình ảnh được cắt vào các góc của thẻ
  },
  cardBackgroundImage: {
    borderRadius: 10,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 55,
    right: 10,
    left: 180,
    top: 10,
    backgroundColor: "#8B8A8A",
    position: "absolute",
    marginBottom: 10,
    marginRight: 10,
  },
  card: {
    // backgroundColor: "#4D4C4C",
    // borderRadius: 30,
    // padding: 20,
    // marginHorizontal: 20,
    // paddingBottom: 50,
    // paddingTop: 40,
    // marginTop: 20,
    // textAlign: "left",
    // alignItems: "flex-start",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // elevation: 2,
  },
  innerRectangle: {
    position: "absolute",
    backgroundColor: "#e56161",
    borderRadius: 30,
    padding: 50,
    paddingRight: 281,
    marginLeft: 26,
    marginHorizontal: 20,
    marginTop: 20,
    textAlign: "left",
    alignItems: "flex-start",
    top: "23%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  innerRectangle1: {
    position: "absolute",
    backgroundColor: "#efa4a4",
    borderRadius: 30,
    padding: 50,
    paddingRight: 271,
    marginLeft: 31,
    marginHorizontal: 20,
    marginTop: 20,
    textAlign: "left",
    alignItems: "flex-start",
    top: "24%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  innerRectangle2: {
    position: "absolute",
    backgroundColor: "#e0bdbd",
    borderRadius: 30,
    padding: 50,
    paddingRight: 251,
    marginLeft: 41,
    marginHorizontal: 20,
    marginTop: 20,
    textAlign: "left",
    alignItems: "flex-start",
    top: "25%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  tabScrollContainer: {
    marginBottom: 50,
    marginHorizontal: 15,
  },
  productGrid: {},
});
