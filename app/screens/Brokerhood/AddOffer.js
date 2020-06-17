import React, { useState, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddOfferForm from "../../components/BrokerHood/AddOfferForm";

export default function AddOffer(props) {
  const { navigation, route } = props;
  const { brokerhood } = route.params;
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      <AddOfferForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
        brokerhood={brokerhood}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={isLoading} text="Cargando Oferta" />
    </View>
  );
}
