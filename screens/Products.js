import {  useEffect, useState } from 'react';
import { View, Text, FlatList,Button } from 'react-native';


export default function Products ({navigation,route})  {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://app.signalgas.io/api/v1/products', {
      headers: {
        Authorization: "Bearer "+route.params.token,
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
    <View>
     
      <Button title="Countries" onPress={()=>navigation.navigate("Countries",{token:route.params.token})}/>
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

