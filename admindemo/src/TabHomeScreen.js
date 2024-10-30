import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Item from "./item";
import { GET_ALL, GET_IMG } from "../../../api/apiService";
function HomeScreen() {
  const [coffeeData, setCoffeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Use the GET_ALL function to fetch data from your API
    GET_ALL("products")
      .then((response) => {
        const responseData = response.data;
        if (responseData && Array.isArray(responseData.content)) {
          setCoffeeData(responseData.content); // Update the state with the "content" array
        } else {
          console.error(
            "Data received from the API is not in a supported format."
          );
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);
  return (
    <ScrollView style={{ marginBottom: 10 }}>
      <View style={styles.Content}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          coffeeData.map((coffee, index) => (
            <Item
              key={index}
              imageSource={GET_IMG("products", coffee.photo)}
              textContent={coffee.title}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({});
export default HomeScreen;
