import {  useEffect, useState } from 'react';
import { View, Text, FlatList,StyleSheet,Platform ,SafeAreaView,ActivityIndicator,StatusBar} from 'react-native';

export default function Countries ({navigation,route})  {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetch('https://app.signalgas.io/api/v1/countries/', {
      headers: {
        Authorization: "Bearer "+route.params.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Countries:', data); // Logging the fetched products data
        
        setIsLoading(false)
        setProducts(data);
      })
      .catch((error) => {console.error(error);
        setIsLoading(false)

      });
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
    <View>
     
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text> ID : {item.id}</Text>
            <Text> Name : {item.name}</Text>
            <Text> Created At : {item.created_at}</Text>
            <Text> Updated At : {item.updated_at}</Text>
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 2,
    padding: 16,
    margin: 16,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center", // Center the loading spinner
    alignItems: "center", // Center the loading spinner
  },
 
});

