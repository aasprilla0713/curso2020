import React, { useState, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddOfferGenForm from "../../components/BrokerHood/AddOfferGenForm";

export default function AddOfferGen(props) {
  const { navigation, route } = props;
  const { idComuna, curBroker, setReloadData, origen } = route.params;
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      <AddOfferGenForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
        curBroker={curBroker}
        idComuna={idComuna}
        setReloadData={setReloadData}
        origen={origen}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={isLoading} text="Cargando Oferta" />
    </View>
  );
}
