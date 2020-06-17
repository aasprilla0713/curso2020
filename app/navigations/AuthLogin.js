import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/Account/MyAccount";
import LoginScreen from "../screens/Account/Login";
import RegisterScreen from "../screens/Account/Register";

const Stack = createStackNavigator();

export default function AuthLoging() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "BIENVENIDO" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Registro" }}
      />
    </Stack.Navigator>
  );
}
