import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyBrokerHoodsScreen from "../screens/Brokerhood/MyBrokerHoods";
import MyBrokerInvitationScreen from "../screens/Brokerhood/MyBrokerInvitation";
import BrokerHoodScreen from "../screens/Brokerhood/BrokerHood";
import BrokerHoodInvScreen from "../screens/Brokerhood/BrokerHoodInv";
import AddBrokerHoodScreen from "../screens/Brokerhood/AddBrokerHood";
import AddOfferScreen from "../screens/Brokerhood/AddOffer";
import AddOrderScreen from "../screens/Brokerhood/AddOrder";
import AddOfferGenScreen from "../screens/Brokerhood/AddOfferGen";
import AddOrderGenScreen from "../screens/Brokerhood/AddOrderGen";
import SearchMembersScreen from "../screens/Brokerhood/SearchMembers";
import SearchCityScreen from "../screens/Brokerhood/SearchCity";
import SearchCamunaScreen from "../screens/Brokerhood/SearchComuna";
import SearchContactsScreen from "../screens/Brokerhood/SearchContacts";
import MyOffersScreen from "../screens/Brokerhood/MyOffers";
import MyOrdersScreen from "../screens/Brokerhood/MyOrders";
import ShowOffercreen from "../screens/Brokerhood/ShowOffer";

const Stack = createStackNavigator();

export default function BrokerHoodStack(props) {
  console.log("ENTRANDO");
  console.log(props);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyBrokerHoods"
        component={MyBrokerHoodsScreen}
        options={{ title: "Brokerhoods" }}
      />
      <Stack.Screen
        name="MyBrokerInvitation"
        component={MyBrokerInvitationScreen}
        options={{ title: "Confirmar" }}
      />
      <Stack.Screen
        name="Brokerhood"
        component={BrokerHoodScreen}
        options={{ title: "Brokerhood" }}
      />
      <Stack.Screen
        name="BrokerhoodInv"
        component={BrokerHoodInvScreen}
        options={{ title: "Invitado" }}
      />
      <Stack.Screen
        name="AddBrokerhood"
        component={AddBrokerHoodScreen}
        options={{ title: "BrokerHood" }}
      />
      <Stack.Screen
        name="AddOffer"
        component={AddOfferScreen}
        options={{ title: "Crear Oferta" }}
      />
      <Stack.Screen
        name="AddOfferGen"
        component={AddOfferGenScreen}
        options={{ title: "Crear Oferta" }}
      />
      <Stack.Screen
        name="AddOrder"
        component={AddOrderScreen}
        options={{ title: "Crear Pedido" }}
      />
      <Stack.Screen
        name="AddOrderGen"
        component={AddOrderGenScreen}
        options={{ title: "Crear Pedido" }}
      />
      <Stack.Screen
        name="SearchMembers"
        component={SearchMembersScreen}
        options={{ title: "Brokers" }}
      />
      <Stack.Screen
        name="SearchContacts"
        component={SearchContactsScreen}
        options={{ title: "Contactos" }}
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
    </Stack.Navigator>
  );
}
