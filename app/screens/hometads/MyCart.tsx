import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

const Categories = ({ navigation }: { navigation: any }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Xử lý thanh toán
  //  const handleAddToOrder = async () => {
  //   try {
  //     const userId = 1;  // Giả sử userId cố định là 1

  //     // Fetch orders by userId
  //     const orderResponse = await fetch(`http://192.168.211.161:8080/api/orders?userId=${userId}`);
  //     let orderId;

  //     if (orderResponse.ok) {
  //       const orderData = await orderResponse.json();

  //       // Nếu đơn hàng đã tồn tại, lấy orderId
  //       if (orderData.content && orderData.content.length > 0) {
  //         orderId = orderData.content[0].id;
  //       } else {
  //         // Tạo một đơn hàng mới nếu không tồn tại đơn hàng
  //         const newOrderResponse = await fetch("http://192.168.211.161:8080/api/orders", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ userId }),
  //         });

  //         if (!newOrderResponse.ok) {
  //           throw new Error("Failed to create a new order");
  //         }

  //         const newOrderData = await newOrderResponse.json();
  //         orderId = newOrderData.id;
  //       }

  //       // Duyệt qua từng sản phẩm trong giỏ hàng và thêm vào orderDetails
  //       for (const item of cartItems) {
  //         const addToOrderResponse = await fetch("http://192.168.211.161:8080/api/orderDetails", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             quantity: item.quantity,
  //             order: { id: orderId },      // Sử dụng orderId đã lấy được
  //             product: { id: item.product.id },  // Lấy product_id từ sản phẩm trong giỏ hàng
  //           }),
  //         });

  //         if (!addToOrderResponse.ok) {
  //           const error = await addToOrderResponse.json();
  //           throw new Error(`Failed to add to order: ${error.message}`);
  //         }
  //       }

  //       console.log("All products added to order");

  //       navigation.navigate("Home", { screen: 'Categories' });
  //     } else {
  //       throw new Error("Failed to fetch orders");
  //     }
  //   } catch (error) {
  //     console.error("Error adding products to order:", error);
  //   }
  // };

  const handleAddToOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert(
        "Giỏ hàng trống",
        "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán."
      );
      return;
    }

    try {
      const userId = 1; // Giả sử userId cố định là 1

      // Fetch orders by userId
      const orderResponse = await fetch(
        `http://192.168.211.161:8080/api/orders?userId=${userId}`
      );
      let orderId;

      if (orderResponse.ok) {
        const orderData = await orderResponse.json();

        // Nếu đơn hàng đã tồn tại, lấy orderId
        if (orderData.content && orderData.content.length > 0) {
          orderId = orderData.content[0].id;
        } else {
          // Tạo một đơn hàng mới nếu không tồn tại đơn hàng
          const newOrderResponse = await fetch(
            "http://192.168.211.161:8080/api/orders",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId }),
            }
          );

          if (!newOrderResponse.ok) {
            throw new Error("Failed to create a new order");
          }

          const newOrderData = await newOrderResponse.json();
          orderId = newOrderData.id;
        }

        // Duyệt qua từng sản phẩm trong giỏ hàng và thêm vào orderDetails
        for (const item of cartItems) {
          const addToOrderResponse = await fetch(
            "http://192.168.211.161:8080/api/orderDetails",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                quantity: item.quantity,
                order: { id: orderId },
                product: { id: item.product.id },
              }),
            }
          );

          if (!addToOrderResponse.ok) {
            const error = await addToOrderResponse.json();
            throw new Error(`Failed to add to order: ${error.message}`);
          }
        }

        // Sau khi thêm vào đơn hàng, xóa tất cả sản phẩm trong giỏ hàng
        for (const item of cartItems) {
          const deleteResponse = await fetch(
            `http://192.168.211.161:8080/api/cartDetails/${item.id}`,
            {
              method: "DELETE",
            }
          );

          if (!deleteResponse.ok) {
            throw new Error(`Failed to delete cart item with id: ${item.id}`);
          }
        }

        // Xóa sản phẩm trong state sau khi xóa thành công trên server
        setCartItems([]);

        // Hiển thị thông báo thanh toán thành công và điều hướng đến OrderApprovedScreen
        Alert.alert(
          "Thanh toán thành công",
          "Đơn hàng của bạn đã được tạo thành công!",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("OrderApprovedScreen"),
            },
          ]
        );
      } else {
        throw new Error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error adding products to order:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
    }
  };

  // Cố định userId là 4
  // const userId = 4;

  // Refresh cart when screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchCartItems = async () => {
        try {
          const response = await fetch(
            "http://192.168.211.161:8080/api/cartDetails"
          );
          const result = await response.json();
          setCartItems(result.content); // Assuming the cart items are in the `content` field
          setLoading(false);
        } catch (error) {
          console.error("Error fetching cart items:", error);
          setLoading(false);
        }
      };

      fetchCartItems();
      return () => {
        setCartItems([]); // Clear cart items when screen is unfocused (optional)
      };
    }, [])
  );

  // Increase quantity of an item
  const increaseQuantity = async (index: number) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;

    try {
      await fetch(
        `http://192.168.211.161:8080/api/cartDetails/${newCartItems[index].id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newCartItems[index],
            quantity: newCartItems[index].quantity,
          }),
        }
      );
      setCartItems(newCartItems);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Decrease quantity of an item
  const decreaseQuantity = async (index: number) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;

      try {
        await fetch(
          `http://192.168.211.161:8080/api/cartDetails/${newCartItems[index].id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...newCartItems[index],
              quantity: newCartItems[index].quantity,
            }),
          }
        );
        setCartItems(newCartItems);
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  // Remove item from cart
  const removeItem = async (index: number) => {
    const itemToRemove = cartItems[index];
    try {
      await fetch(
        `http://192.168.211.161:8080/api/cartDetails/${itemToRemove.id}`,
        {
          method: "DELETE",
        }
      );
      const newCartItems = cartItems.filter((_, i) => i !== index);
      setCartItems(newCartItems);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const renderRightActions = (index: number) => (
    <TouchableOpacity
      onPress={() => removeItem(index)}
      style={styles.removeButton}
    >
      <MaterialCommunityIcons name="delete" size={30} color="white" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading cart...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.txt1}>My Cart</Text>
      </View>
      <Text style={styles.txt2}>Quantity ({cartItems.length}):</Text>
      <ScrollView>
        {cartItems.map((item, index) => (
          <Swipeable
            key={index}
            renderRightActions={() => renderRightActions(index)}
          >
            <View style={styles.cartItem}>
              <Image
                source={{
                  uri: `http://192.168.211.161:8080/api/image/products/${item.product.photo}`,
                }}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.product.title}</Text>
                <Text style={styles.itemPrice}>
                  {item.product.price.toLocaleString("en-US")} ₫
                </Text>
                <Text style={styles.itemQuantity}>
                  Quantity: {item.quantity}
                </Text>
                <View style={styles.quantityControls}>
                  <TouchableOpacity onPress={() => decreaseQuantity(index)}>
                    <MaterialCommunityIcons
                      name="minus-circle"
                      size={24}
                      color="red"
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => increaseQuantity(index)}>
                    <MaterialCommunityIcons
                      name="plus-circle"
                      size={24}
                      color="green"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Swipeable>
        ))}
      </ScrollView>

      <View style={styles.totalPriceContainer}>
        <View style={styles.totalPriceRow}>
          <Text style={styles.totalPriceLabel}>
          Total:</Text>
          <Text style={styles.totalPriceValue}>
            {calculateTotalPrice().toLocaleString("en-US")} ₫
          </Text>
        </View>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handleAddToOrder}
        >
          <Text style={styles.placeOrderButtonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Categories;

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
    marginRight: 120,
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 130,
    color: "#FFFFFF",
    textShadowColor: "#000000", // Màu sắc của viền
    textShadowOffset: { width: 2, height: 2 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: "#e0e0e0",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e10505",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#000",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "100%",
    borderRadius: 10,
  },
  totalPriceContainer: {
    backgroundColor: "#FFC522",
    padding: 10,
    borderRadius: 10,
    marginBottom: 55,
  },
  totalPriceRow: {
    flexDirection: "row", // Aligns the "Tổng cộng" and price in a row
    justifyContent: "space-between", // Ensures space between the label and value
    alignItems: "center", // Aligns them vertically in the center
    marginBottom: 10, // Adds some space between the row and the button
  },
  totalPriceLabel: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  totalPriceValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fa0a0a",
  },
  placeOrderButton: {
    backgroundColor: "#fa6a0a",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  placeOrderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  txt2: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 10,
    textShadowColor: "#e10505", // Màu sắc của viền
    textShadowOffset: { width: 1, height: 1 }, // Độ dịch chuyển của bóng
    textShadowRadius: 1, // Độ mờ của bóng
  },
});
