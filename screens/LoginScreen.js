import {React, useState} from 'react';
import { View, TextInput, Button, Alert ,Text} from 'react-native';


export default function LoginScreen ({navigation,route}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    const data = {
      email: email,
      password: password,
    };

    fetch('https://app.signalgas.io/api/v1/customer/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the response data
        console.log(responseData);
        // You can also perform additional actions based on the response
        console.log(responseData.message);
        if (responseData.message==='Sign-in successful') {
          // Redirect to another screen or perform other actions
            Alert.alert('Success', 'You have signed in successfully!');
          //  pernament navigation
          navigation.replace('Products',
          {token:responseData.token});
        } else {
          // Show an error message
          Alert.alert('', responseData.message);
        }
      })
      .catch((error) => {
        console.error(error);
        // Show an error message
        Alert.alert('Error', 'An error occurred. Please try again later.');
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Text>Don't have an account? Sign up</Text>
      
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

