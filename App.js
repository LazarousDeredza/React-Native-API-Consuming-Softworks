import { Pressable, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BackHandler } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import Products from "./screens/Products";
import Countries from "./screens/Countries";




const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
    initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: "#6a51ae" },
        headerTitleStyle: { fontWeight: "bold" },
        headerTintColor: "#fff",
        contentStyle: { backgroundColor: "#e8e4f3" },
       
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login",

          headerRight: () => (
            <Pressable onPress={() => BackHandler.exitApp()}>
              <Text style={{ color: "#fff", fontSize: 16 }}>Exit</Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        initialParams={{
          name: "Customer Sign Up",
        }}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options= {({route})=>
        ({
          title:"Products",
          token:route.params.token,
        })        }
      />
       <Stack.Screen
        name="Countries"
        component={Countries}
        options= {({route})=>
        ({
          title:"Countries",
          token:route.params.token,
        })        }
      />
    </Stack.Navigator>
    
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
