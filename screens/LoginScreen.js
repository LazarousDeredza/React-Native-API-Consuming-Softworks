import { React, useState } from 'react';
import {
  View, TextInput, Button, Alert, Text, StyleSheet,
  KeyboardAvoidingView, Image,Platform
} from 'react-native';


export default function LoginScreen({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSignIn = () => {
    if (validateForm()) {
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
          if (responseData.message === 'Sign-in successful') {
            // Redirect to another screen or perform other actions
            Alert.alert('Success', 'You have signed in successfully!');
            //  pernament navigation
            setEmail("");
            setPassword("");
            navigation.replace('Products',
              { token: responseData.token });
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

     
      setErrors({});
    }
  };


  // <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <View style={styles.form}>
        <Image
          source={require("../assets/lock.png")}
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
          
            marginBottom: 10,
          }}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}

        <Button title="Login" onPress={handleSignIn} />
        <Text style={styles.dontHaveAccount}>Don't Have Account ? </Text>
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  dontHaveAccount:{
   padding:10,
   color:"blue"
  }
});