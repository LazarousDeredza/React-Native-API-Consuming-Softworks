import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';




export default function SignUpScreen ({navigation})  {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [countryId, setCountryId] = useState(1);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Perform the signup logic here, e.g., make the API call
    const signupData = {
      fname,
      lname,
      country_id: countryId,
      phone,
      email,
      password,
    };

    // Make the API call using fetch or any other HTTP library
    fetch('https://app.signalgas.io/api/v1/customer/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data and any subsequent actions
        console.log(data);
        console.log("Message : " + data.message);
        const proceedButton = data.message === "Signup completed. An email has been send to you. Kindly confirm the email to proceed" ? {
          text: 'Proceed',
          onPress: () => navigation.navigate('Login'),
        } : null;
  
        Alert.alert(
          data.message,
          '',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            proceedButton,
          ].filter(Boolean),
          { cancelable: false }
        );
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        alert('Failed to sign up', error.message);
      });
  };

  return (
    <View>
      <Text>Signup Screen</Text>
      <TextInput
        placeholder="First Name"
        value={fname}
        onChangeText={setFname}
      />
      <TextInput
        placeholder="Last Name"
        value={lname}
        onChangeText={setLname}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};
