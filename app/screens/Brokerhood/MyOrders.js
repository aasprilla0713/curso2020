import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ActionButton from "react-native-action-button";
import { Icon } from "react-native-elements";

import Loading from "../../components/Loading";
import MyOrdersForm from "../../components/BrokerHood/MyOrdersForm";
import { cargarOrders } from "../../utils/ReloadEnv";
import CST from "../../utils/CustomSettings";

export default function MyBrokerOrdes(props) {
  const { navigation, route } = props;
  const { curBroker } = route.params;
  const [brokerInfo, setBrokerInfo] = useState(curBroker);
  const [brokerOrders, setBrokerOrders] = useState([]);
  const [inMemoryOrders, setInMemoryOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReloadBrokerOrders, setIsReloadBrokerOrders] = useState(false);

  useEffect(() => {
    (async () => {
      //Se obtienen Pedidos desde AsyncStorage
      const broker_orders = await cargarOrders();
      setBrokerOrders(broker_orders);
      setInMemoryOrders(broker_orders);
    })();
    setIsReloadBrokerOrders(false);
  }, [isReloadBrokerOrders]);

  return (
    <View style={styles.viewBody}>
      <MyOrdersForm
        navigation={navigation}
        brokerOrders={brokerOrders}
        brokerInfo={brokerInfo}
        setBrokerOrders={setBrokerOrders}
        inMemoryOrders={inMemoryOrders}
        setIsReloadBrokerOrders={setIsReloadBrokerOrders}
        setIsLoading={setIsLoading}
      />
      <Loading isVisible={isLoading} text="Procesando... por favor espere" />
      <AddOrder navigation={navigation} brokerInfo={brokerInfo} />
    </View>
  );
}

function AddOrder(props) {
  const { navigation, brokerInfo } = props;
  return (
    <ActionButton
      buttonColor="#65A4CA"
      title="Cerra Sesión"
      onPress={() =>
        navigation.navigate("SearchCity", {
          navigation: navigation,
          curBroker: brokerInfo,
          origen: 4,
        })
      }
      renderIcon={(active) =>
        active ? (
          <Icon
            type="material-community"
            name="home-city-outline"
            color="#fff"
            size={25}
          />
        ) : (
          <Icon
            type="material-community"
            name="home-city-outline"
            color="#fff"
            size={25}
          />
        )
      }
    ></ActionButton>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
});
