import React, { useState, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddOrderGenForm from "../../components/BrokerHood/AddOrderGenForm";

export default function AddOrderGen(props) {
  const { navigation, route } = props;
  const { idComuna, curBroker, setReloadData, origen } = route.params;
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      <AddOrderGenForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
        curBroker={curBroker}
        idComuna={idComuna}
        setReloadData={setReloadData}
        origen={origen}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={isLoading} text="Cargando Pedido" />
    </View>
  );
}
