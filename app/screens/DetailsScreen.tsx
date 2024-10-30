import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput, // Thêm TextInput để người dùng có thể nhập ghi chú
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DetailsScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { id, title, price, photo } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [showDrinks, setShowDrinks] = useState(false);
  const [showFries, setShowFries] = useState(false);
  const [showDrinks1, setShowDrinks1] = useState(false); 
  const [note, setNote] = useState(""); // Thêm trạng thái để lưu ghi chú của người dùng

  const items = [
    { name: "1 chai tài lộc quá lớn", price: 50000 },
    { name: "Pepsi lớn (up)", price: 5000 },
    { name: "7Up (up)", price: 5000 },
    { name: "Mirinda lớn (up)", price: 5000 },
    { name: "Pepsi vừa", price: 5000 },
    { name: "7UP vừa", price: 5000 },
    { name: "Mirinda vừa", price: 5000 },
    { name: "Nước suối (up)", price: 5000 },
    { name: "Cacao sữa đá vừa (up)", price: 5000 },
    { name: "Cacao sữa đá lớn (up)", price: 5000 },
    { name: "Nước ép xoài đào (up)", price: 5000 },
  ];

  const friesItems = [
    { name: "Khoai tây lắc vị BBQ lớn", price: 35000 },
    { name: "KKhoai tây lắc vị BBQ vừa", price: 25000  },
    { name: "Khoai tây chiên lớn", price: 20000 },
    { name: "Súp bí đỏ", price: 15000 },
    { name: "Cơm Trắng", price: 10000 },
  ];

  const items1 = [
    { name: "Bánh xoài đào", price: 10000 },
    { name: "Kem Tropical Sundae", price: 20000 },
    { name: "Kem Sundae Dâu", price: 15000 },
    { name: "Kem Sundae Socola", price: 15000 },
    { name: "Kem Sôcôla (Cúp)", price: 7000 },
    { name: "Kem Sữa Tươi (Cúp)", price: 5000 },
  ];

  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(items.length).fill(false));

  const handleCheckboxToggle = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const handleAddToCart = async () => {
    try {
      const product = { id, title, price, quantity, photo };
      const userId = 1;

      const cartResponse = await fetch(`http://192.168.211.161:8080/api/carts?userId=${userId}`);
      let cartId;

      if (cartResponse.ok) {
        const cartData = await cartResponse.json();

        if (cartData.content && cartData.content.length > 0) {
          cartId = cartData.content[0].id;
        } else {
          const newCartResponse = await fetch("http://192.168.211.161:8080/api/carts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          });

          if (!newCartResponse.ok) {
            throw new Error("Failed to create a new cart");
          }

          const newCartData = await newCartResponse.json();
          cartId = newCartData.id;
        }

        const addToCartResponse = await fetch("http://192.168.211.161:8080/api/cartDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity,
            cart: { id: cartId },
            product: { id: product.id },
          }),
        });

        if (!addToCartResponse.ok) {
          const error = await addToCartResponse.json();
          throw new Error(`Failed to add to cart: ${error.message}`);
        }

        const result = await addToCartResponse.json();
        console.log("Product added to cart:", result);

        navigation.navigate("Home", {screen : 'Categories'});
      } else {
        throw new Error("Failed to fetch cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            color={"#ffffff"}
            size={30}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.txt1}>Order</Text>
      </View>
      <View style={styles.card}>
        <Image
          source={{
            uri: `http://192.168.211.161:8080/api/image/products/${photo}`,
          }}
          style={styles.itemImagePlaceholder1}
        />
      </View>
      <View style={styles.v}>
        <Text style={styles.orderHeader}>{title}</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="heart"
            color={"#e10505"}
            size={30}
            style={styles.icon1}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.text1}>{`${price.toLocaleString("en-US")} ₫`}</Text>
      <View style={styles.itemQuantity}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Text style={styles.quantityButtonText1}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton1}
          onPress={() => setQuantity(quantity + 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Thanh chọn nước */}
        <TouchableOpacity
          onPress={() => setShowDrinks(!showDrinks)}
          style={styles.drinksToggle}
        >
          <Text style={styles.text2}>
          Drinks</Text>
          <MaterialCommunityIcons
            name={showDrinks ? "chevron-up" : "chevron-down"}
            color="#000"
            size={30}
          />
        </TouchableOpacity>
        {showDrinks && (
          <ScrollView>
            {items.map((item, index) => (
              <View key={index} style={styles.cartItem}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => handleCheckboxToggle(index)}
                >
                  <MaterialCommunityIcons
                    name={
                      checkedItems[index]
                        ? "checkbox-marked"
                        : "checkbox-blank-outline"
                    }
                    color={"#000000"}
                    size={24}
                  />
                </TouchableOpacity>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{`${item.price.toLocaleString(
                    "en-US"
                  )} ₫`}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Thanh chọn khoai */}
        <TouchableOpacity
          onPress={() => setShowFries(!showFries)}
          style={styles.drinksToggle}
        >
          <View style={styles.toggleContainer}>
            <Text style={styles.text2}>Helping</Text>
            <MaterialCommunityIcons
              name={showFries ? "chevron-up" : "chevron-down"}
              color="#000"
              size={30}
            />
          </View>
        </TouchableOpacity>
        {showFries && (
          <ScrollView>
            {friesItems.map((item, index) => (
              <View key={index} style={styles.cartItem}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => handleCheckboxToggle(index)}
                >
                  <MaterialCommunityIcons
                    name={
                      checkedItems[index]
                        ? "checkbox-marked"
                        : "checkbox-blank-outline"
                    }
                    color={"#000000"}
                    size={24}
                  />
                </TouchableOpacity>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{`${item.price.toLocaleString(
                    "en-US"
                  )} ₫`}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
        <TouchableOpacity
          onPress={() => setShowDrinks1(!showDrinks1)}
          style={styles.drinksToggle}
        >
          <Text style={styles.text2}>
          Dessert</Text>
          <MaterialCommunityIcons
            name={showDrinks1 ? "chevron-up" : "chevron-down"}
            color="#000"
            size={30}
          />
        </TouchableOpacity>
        {showDrinks1 && (
          <ScrollView>
            {items1.map((item, index) => (
              <View key={index} style={styles.cartItem}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => handleCheckboxToggle(index)}
                >
                  <MaterialCommunityIcons
                    name={
                      checkedItems[index]
                        ? "checkbox-marked"
                        : "checkbox-blank-outline"
                    }
                    color={"#000000"}
                    size={24}
                  />
                </TouchableOpacity>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{`${item.price.toLocaleString(
                    "en-US"
                  )} ₫`}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Phần ghi chú */}
        <Text style={styles.text3}>
        Order notes:</Text>
        <TextInput
          style={styles.noteInput}
          value={note}
          onChangeText={(text) => setNote(text)}
          placeholder="Enter your notes..."
          multiline
        />
      </ScrollView>

      {/* Nút "Add to Cart" được cố định ở dưới cùng */}
      <View>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.placeOrderButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    flexDirection: "column",
  },
  container1: {
    backgroundColor: "#fa0a0a",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  txt1: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    marginRight: 140,
    marginLeft: 110,
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  icon1: {
    marginLeft: 100,
    marginHorizontal: 20,
    marginTop: 20,
  },
  icon: {
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 30,
    padding: 5,
    marginHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 25,
    textAlign: "left",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    position: "relative",
  },
  orderHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 25,
    marginTop: 20,
    color: "#000000",
    textShadowColor: "#e10505",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  itemQuantity: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 40,
  },
  quantityButton: {
    backgroundColor: "#e10505",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
  },
  quantityButton1: {
    backgroundColor: "#e10505",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  quantityButtonText1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 5,
    color: "#000000",
  },
  placeOrderButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },
  placeOrderButton: {
    backgroundColor: "#fa6a0a",
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  v: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text1: {
    fontSize: 20,
    marginLeft: 25,
    color: "#e10505",
    marginBottom: 10,
    fontWeight: "bold",
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  itemImagePlaceholder1: {
    width: 335,
    height: 200,
    backgroundColor: "#8B8A8A",
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    flexDirection: "row", // Đặt phần tử trong hàng ngang
    justifyContent: "space-between", // Khoảng cách giữa tên món và giá tiền
    alignItems: "center", // Căn giữa theo trục dọc
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text2: {
    fontWeight: "bold",
    fontSize: 18,
    padding: 5,
    color: "#000000",
    textShadowColor: "#e10505", // Màu sắc của viền
    textShadowOffset: { width: 1, height: 1 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
    marginRight: 10, // Thêm khoảng cách giữa chữ và icon
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 4,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderTopWidth: 2, // Add top border
    borderTopColor: "#e10505",
    borderBottomColor: "#e10505",
    borderBottomWidth: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e10505",
  },
  checkbox: {
    marginRight: 10,
  },
  drinksToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFC522",
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  toggleContainer: {
    flexDirection: "row", // Đặt các phần tử thành hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    justifyContent: "space-between", // Khoảng cách giữa chữ và icon
    width: "100%", // Để đảm bảo đủ không gian cho cả chữ và icon
  },
  text3: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 25,
    marginTop: 10,
    color: "#000000",
    textShadowColor: "#e10505",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  noteInput: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#e10505",
    borderWidth: 1,
    textAlignVertical: "top", // Để văn bản bắt đầu từ đầu khi người dùng nhập ghi chú
  },
});
