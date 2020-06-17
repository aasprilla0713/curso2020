import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RankingScreen from "../screens/Ranking/Ranking";
import TopCiudadScreen from "../screens/Ranking/TopCiudad";
import ShowSalesManScreen from "../screens/Ranking/ShowSalesMan";
import ShowBuyerScreen from "../screens/Ranking/ShowBuyer";

const Stack = createStackNavigator();

export default function LoguedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TopBroker"
        component={RankingScreen}
        options={{ title: "Top 20" }}
      />
      <Stack.Screen
        name="TopCity"
        component={TopCiudadScreen}
        options={{ title: "Top 20" }}
      />
      <Stack.Screen
        name="ShowSalesMan"
        component={ShowSalesManScreen}
        options={{ title: "+ INFO" }}
      />
      <Stack.Screen
        name="ShowBuyer"
        component={ShowBuyerScreen}
        options={{ title: "+ INFO" }}
      />
    </Stack.Navigator>
  );
}
