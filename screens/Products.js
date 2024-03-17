import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Platform, ScrollView, StyleSheet, StatusBar, Pressable, SafeAreaView, ActivityIndicator } from 'react-native';
import ProductCard from '../components/ProductCard';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


export default function Products({ navigation, route }) {
  const [products, setProducts] = useState([]);
  const [countries, setCountries] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://app.signalgas.io/api/v1/countries/', {
          headers: {
            Authorization: "Bearer " + route.params.token,
          },
        });
        const data = await response.json();
        console.log('Fetched Countries:', data);
        setIsLoading(false);
        setError("");
        setCountries(data);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setError("Failed to fetch Countries.");
      }
    };
  
    fetchCountries();
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://app.signalgas.io/api/v1/products', {
          headers: {
            Authorization: "Bearer " + route.params.token,
          },
        });
        const data = await response.json();
        console.log('Fetched products:', data);
        setIsLoading(false);
        setError("");
        setProducts(data);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setError("Failed to fetch Products.");
      }
    };
  
    fetchProducts();
  }, []);







  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.scrollView}>
      <FlatList
        data={products}
        renderItem={({ item }) => {
          console.log(item.id);

       
          console.log( );


          return (
            ProductData = {
              name: item.name,
              image: item.name === "3KG Tank" ? require("../assets/gasimages/3kg.png") : item.name === "5KG Tank" ? require("../assets/gasimages/5kg.jpeg") : item.name === "7KG Tank" ? require("../assets/gasimages/7kg.jpeg") : require("../assets/gasimages/3kg.png"),
              type: item.price,
              hp: item.weight,
              created_at: item.created_at,
              updated_at: item.updated_at,
              country:countries.length>0?countries.filter(country => country.id === item.country_id)[0].name:"Country Loading"
             


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
          <View style={styles.topHeader}>
            <Text style={styles.headerText}>Products List</Text>
            <Pressable onPress={() => navigation.navigate('Countries',
              { token: route.params.token })}>
              <Text style={styles.countries}>View Countries</Text>
            </Pressable>

          </View>
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
  topHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginHorizontal: 20
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
  countries: {
    fontSize: 20,
    textAlign: "center",
    color: "blue",
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
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center", // Center the loading spinner
    alignItems: "center", // Center the loading spinner
  },
});

