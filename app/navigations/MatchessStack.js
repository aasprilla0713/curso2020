import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MatchesScreen from "../screens/Matches/Coincidences";
import MatchPedidoScreen from "../screens/Matches/MatchPedido";
import MatchOfertaScreen from "../screens/Matches/MatchOferta";
import SearchContactsScreen from "../screens/Brokerhood/SearchContacts";

const Stack = createStackNavigator();

export default function MatchesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Matches"
        component={MatchesScreen}
        options={{ title: "MATCHES" }}
      />
      <Stack.Screen
        name="MatchPedido"
        component={MatchPedidoScreen}
        options={{ title: "PEDIDO" }}
      />
      <Stack.Screen
        name="MatchOferta"
        component={MatchOfertaScreen}
        options={{ title: "OFERTA" }}
      />
      <Stack.Screen
        name="SearchContacts"
        component={SearchContactsScreen}
        options={{ title: "Contactos" }}
      />
    </Stack.Navigator>
  );
}
