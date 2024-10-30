import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const GetOrders = ({ navigation }: { navigation: any }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://192.168.211.161:8080/api/orders");
        const result = await response.json();
        setOrders(result.content);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Hiển thị nếu đang tải
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fa6a0a" />
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  // Hiển thị nếu không có đơn hàng
  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You have no orders at the moment.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Categories")}
        >
          <Text style={styles.buttonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#ffffff" />
        </Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>Your Orders</Text>
      <ScrollView>
        {orders.map((order, index) => (
          <View key={index} style={styles.orderItem}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Order ID: {order.id}</Text>
            </View>
            <View style={styles.orderDetails}>
              <Text style={styles.orderText}>Date: {order.date}</Text>
              {/* Lấy userId từ order.user.id */}
              <Text style={styles.orderText}>User ID: {order.user.id}</Text>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() =>
                  navigation.navigate("OrderDetails", { orderId: order.id })
                } // Truyền order.id
              >
                <Text style={styles.detailButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default GetOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  emptyText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fa6a0a",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  back: {
    fontSize: 20,
    marginBottom: 20,
    color: "#000",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fa6a0a",
    marginBottom: 20,
  },
  orderItem: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderDate: {
    fontSize: 14,
    color: "#999",
  },
  orderDetails: {
    marginTop: 10,
  },
  orderText: {
    fontSize: 16,
    color: "#333",
  },
  detailButton: {
    marginTop: 10,
    backgroundColor: "#fa6a0a",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  detailButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
