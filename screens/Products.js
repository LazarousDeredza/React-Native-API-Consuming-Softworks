import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Platform, ScrollView, StyleSheet, StatusBar } from 'react-native';
import ProductCard from '../components/ProductCard';


export default function Products({ navigation, route }) {
  const [products, setProducts] = useState([]);

  

    useEffect(() => {
      fetch('https://app.signalgas.io/api/v1/products', {
        headers: {
          Authorization: "Bearer " + route.params.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched products:', data);


          setProducts(data);
        })
        .catch((error) => console.error(error));
    }, []);

  return (
    <View style={styles.scrollView}>
      <FlatList
        data={products}
        renderItem={({ item }) => {
          console.log(item.id);
         


          return (
            ProductData = {
              name: item.name,
              image: item.name==="3KG Tank"?require("../assets/gasimages/3kg.png"):item.name==="5KG Tank"?require("../assets/gasimages/5kg.jpeg"):item.name==="7KG Tank"?require("../assets/gasimages/7kg.jpeg"):require("../assets/gasimages/3kg.png"),
              type: item.price,
              hp: item.weight,
              created_at: item.created_at,
              updated_at: item.updated_at,
            },

            <ProductCard {...ProductData} />
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={
          <View
            style={{
              height: 16,
            }}
          />
        }
        ListEmptyComponent={<Text>No Items Found</Text>}
        ListHeaderComponent={
          <Text style={styles.headerText}>Products List</Text>
        }
        ListFooterComponent={
          <Text style={styles.footerText}>End of list</Text>
        }
      // horizontal={true}
      />
    </View>



  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    // marginBottom: 16,
    borderWidth: 1,
  },
  cardText: {
    fontSize: 30,
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12,
  },
  footerText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 12,
  },
  sectionHeaderText: {
    backgroundColor: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
});

