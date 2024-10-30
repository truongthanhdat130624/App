import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

interface ProductItemProps {
  navigation: any;
  selectedCategoryId: number | null;
  limit?: number;
  searchQuery: string; // Thêm thuộc tính searchQuery để tìm kiếm theo từ khóa
}

const ProductItem = ({ navigation, selectedCategoryId, limit = 100, searchQuery }: ProductItemProps) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://192.168.211.161:8080/api/products');
        if (!response.ok) {
          throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.content); // Lưu sản phẩm đã lấy từ API
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); // Gọi API khi component được render
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Hiển thị khi đang tải
  }

  if (products.length === 0) {
    return (
      <View style={styles.productCard}>
        <Text style={styles.productName}>Không tìm thấy sản phẩm</Text>
      </View>
    );
  }

  // Lọc sản phẩm dựa trên truy vấn tìm kiếm và danh mục được chọn
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategoryId ? product.category.id === selectedCategoryId : true;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Giới hạn số lượng sản phẩm hiển thị
  const displayedProducts = filteredProducts.slice(0, limit);

  return (
    <>
      {displayedProducts.map((product) => (
        <TouchableOpacity 
          key={product.id} 
          onPress={() => navigation.navigate("DetailsScreen", { 
            id: product.id, 
            title: product.title, 
            price: product.price, 
            photo: product.photo 
          })}
        >
          <View style={styles.productCard}>
            <Image 
              source={{ uri: `http://192.168.211.161:8080/api/image/products/${product.photo}` }} 
              style={styles.productImage} 
            />
            <Text style={styles.productName}>{product.title}</Text>
            <Text style={styles.productPrice}>{product.price.toLocaleString('en-US')} ₫</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  productCard: {
    width: 160,
    height: 245,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 3,
    shadowColor: "#000", // Màu của bóng
    shadowOffset: { width: 0, height: 2 }, // Độ dịch chuyển của bóng
    shadowOpacity: 0.25, // Độ mờ của bóng
    shadowRadius: 3.84, // Bán kính của bóng
    elevation: 5, // Tạo hiệu ứng bóng cho Android
  },
  productImage: {
    width: 140,
    height: 180,
    borderRadius: 10,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#000000",
  },
  productPrice: {
    fontSize: 12,
    color: "#e10505",
  },
});
