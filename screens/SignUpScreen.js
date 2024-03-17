import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';




export default function SignUpScreen({ navigation }) {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [countryId, setCountryId] = useState(1);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});


  const validateForm = () => {
    let errors = {};
    if (!fname) errors.fname = "First Name is Required";
    if (!lname) errors.lname = "Last Name is Required";
    if (!phone) errors.phone = "Phone is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSignup = () => {

    if (validateForm()) {

      const signupData = {
        fname,
        lname,
        country_id: countryId,
        phone,
        email,
        password,
      };

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
              proceedButton
            ].filter(Boolean),
            { cancelable: false }
          );
        })
        .catch((error) => {
          console.error(error);
          alert('Failed to sign up', error.message);
        });
    }
  };

  return (

    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <View style={styles.form}>
        <ScrollView>
          <Image
            source={require("../assets/lock.png")}
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",

              marginBottom: 10,
            }}
          />
          <Text style={styles.label}>First Name</Text>
          <TextInput
            placeholder="Enter First Name"
            value={fname}
            style={styles.input}
            onChangeText={setFname}
          />
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            placeholder="Last Name"
            value={lname}
            style={styles.input}
            onChangeText={setLname}
          />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            placeholder="Phone"
            value={phone}
            style={styles.input}
            keyboardType='numeric'
            onChangeText={setPhone}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Email"
            value={email}
            style={styles.input}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            style={styles.input}
            onChangeText={setPassword}
          />
          <Button title="Signup" onPress={handleSignup} />
        </ScrollView>
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
  dontHaveAccount: {
    padding: 10,
    color: "blue"
  }
});