import React, { useState, useEffect } from "react";
import ShowOffertDet from "../../components/ShowOfferDet";

export default function ShowOffer(props) {
  const { navigation, route } = props;
  const { offert } = route.params;
  return <ShowOffertDet offert={offert} navigation={navigation} />;
}
