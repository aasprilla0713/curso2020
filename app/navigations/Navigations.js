import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CST from "../utils/CustomSettings";
import { MainContext } from "../context/MainContext";

import MatchesStack from "./MatchessStack";
import LoguedStack from "./LoguedStack";
import BrokerHoodStack from "./BrokerHoodStack";
import RankingStack from "./RankingStack";

const Tab = createBottomTabNavigator();

export default function Navigations() {
  const { infoBroker } = useContext(MainContext);

  return (
    <Tab.Navigator
      initialRouteName="Account"
      tabBarOptions={{
        inactiveTintColor: CST.colorSec,
        activeTintColor: CST.colorPrm,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) =>
          screenOptions(route, color, infoBroker.brk_matches),
      })}
    >
      <Tab.Screen
        name="BrokerHoods"
        component={BrokerHoodStack}
        options={{ title: "B-Hoods" }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesStack}
        options={{ title: "Matches" }}
      />
      <Tab.Screen
        name="Ranking"
        component={RankingStack}
        options={{ title: "MVB" }}
      />
      <Tab.Screen
        name="Account"
        component={LoguedStack}
        options={{ title: "Me" }}
      />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, matches) {
  let iconName;

  switch (route.name) {
    case "BrokerHoods":
      iconName = "account-group-outline";
      break;
    case "Matches":
      iconName = "arrow-collapse-all";
      break;
    case "Ranking":
      iconName = "star-outline";
      break;
    case "Account":
      iconName = "account-circle-outline";
      break;
    default:
      break;
  }
  return iconName === "arrow-collapse-all" ? (
    <IconWithBadge
      name="arrow-collapse-all"
      badgeCount={matches}
      color={color}
      size={22}
      matches={matches}
    />
  ) : (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}

function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <MaterialCommunityIcons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: "absolute",
            right: -6,
            top: -1,
            backgroundColor: "green",
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 8, fontWeight: "700" }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}
