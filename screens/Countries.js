import {  useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function Countries ({navigation,route})  {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://app.signalgas.io/api/v1/countries/', {
      headers: {
        Authorization: "Bearer "+route.params.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Countries:', data); // Logging the fetched products data
        
        
        setProducts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View>
      <Text>All Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.price}</Text>
            <Text>{item.weight}</Text>
            <Text>{item.country_id}</Text>
            <Text>{item.created_at}</Text>
            <Text>{item.updated_at}</Text>
          </View>
        )}
      />
    </View>
  );
};

