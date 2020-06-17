import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/Account/AccountLogued";
import MyOffersScreen from "../screens/Brokerhood/MyOffers";
import MyOrdersScreen from "../screens/Brokerhood/MyOrders";
import ShowOffercreen from "../screens/Brokerhood/ShowOffer";
import AddOfferGenScreen from "../screens/Brokerhood/AddOfferGen";
import AddOrderGenScreen from "../screens/Brokerhood/AddOrderGen";
import SearchCityScreen from "../screens/Brokerhood/SearchCity";
import SearchCamunaScreen from "../screens/Brokerhood/SearchComuna";

const Stack = createStackNavigator();

export default function LoguedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyAccount"
        component={AccountScreen}
        options={{ title: "Mi Perfil" }}
      />
      <Stack.Screen
        name="MyOffers"
        component={MyOffersScreen}
        options={{ title: "Ofertas" }}
      />
      <Stack.Screen
        name="MyOrders"
        component={MyOrdersScreen}
        options={{ title: "Pedidos" }}
      />
      <Stack.Screen
        name="ShowOffer"
        component={ShowOffercreen}
        options={{ title: "OFERTA" }}
      />
      <Stack.Screen
        name="SearchCity"
        component={SearchCityScreen}
        options={{ title: "Ciudades" }}
      />
      <Stack.Screen
        name="SearchComuna"
        component={SearchCamunaScreen}
        options={{ title: "Sectores" }}
      />
      <Stack.Screen
        name="AddOfferGen"
        component={AddOfferGenScreen}
        options={{ title: "Oferta" }}
      />
      <Stack.Screen
        name="AddOrderGen"
        component={AddOrderGenScreen}
        options={{ title: "Pedido" }}
      />
    </Stack.Navigator>
  );
}
