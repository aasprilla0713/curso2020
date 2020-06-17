const URL_2020 = "https://2020.aal-estate.com/api";
import { Alert, Platform } from "react-native";
import { ERROR_FETCH } from "../constants";

class SRV {
  //Ciudades donde esta
  getCiudades() {
    return fetch(`${URL_2020}/13`, {
      method: "POST",
      body: JSON.stringify({
        tipo: 1,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }
  //Creacion del broker asociado al usuario registrado
  createBroker(
    user,
    nameBroker,
    companyBroker,
    email,
    telefonoBroker,
    cargoBroker,
    ciudad
  ) {
    return fetch(`${URL_2020}/1`, {
      method: "POST",
      body: JSON.stringify({
        id_mobile: user,
        brk_name: nameBroker,
        brk_mail: email,
        brk_company: companyBroker,
        brk_cargo: cargoBroker,
        ciu_id: ciudad,
        brk_telefono: telefonoBroker,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  //Creacion del broker asociado al usuario registrado
  updateAvatar(user, url) {
    return fetch(`${URL_2020}/2`, {
      method: "POST",
      body: JSON.stringify({
        id_mobile: user,
        brk_avatar: url,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  getBrokerhoods(user, search) {
    return fetch(`${URL_2020}/3`, {
      method: "POST",
      body: JSON.stringify({
        id_mobile: user,
        search: search,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  getBrokerhoodsLimit(user, inicio) {
    return fetch(`${URL_2020}/4`, {
      method: "POST",
      body: JSON.stringify({
        id_mobile: user,
        inicio: inicio,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  //Se traen las comunas para el BH
  getComunasHood(ciu_id) {
    return fetch(`${URL_2020}/13`, {
      method: "POST",
      body: JSON.stringify({
        tipo: 3,
        ciu_id: ciu_id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  //Se traen las comunas para el BH
  getZonasHood(bkh_id) {
    return fetch(`${URL_2020}/13`, {
      method: "POST",
      body: JSON.stringify({
        tipo: 4,
        bkh_id: bkh_id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  //Creacion del brokerhood y el mienbro admin
  createBrokerhood(
    user,
    nameBhood,
    asuntoBhood,
    precioInicial,
    precioFinal,
    bkhComunas,
    imagesSelected,
    ciudad
  ) {
    console.log("imagen");
    console.log(bkhComunas);
    let _uri = imagesSelected[0];
    let uploadData = new FormData();
    uploadData.append("submit", "ok");
    uploadData.append("brk_id", user);
    uploadData.append("ciu_id", ciudad);
    uploadData.append("bkh_nombre", nameBhood);
    uploadData.append("bkh_asunto", asuntoBhood);
    uploadData.append("bkh_minimo", precioInicial);
    uploadData.append("bkh_maximo", precioFinal);
    uploadData.append("bkh_comunas", bkhComunas);
    uploadData.append("bkh_avatar", {
      type: "image/jpeg",
      uri: Platform.OS === "ios" ? _uri.replace("file://", "") : _uri,
      name: "uploadimagetmp.jpeg",
    });
    const headers = new Headers();
    headers.append("accept", "application/json");
    return fetch(`${URL_2020}/5`, {
      method: "POST",
      body: uploadData,
      headers,
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  getBroker(user) {
    return fetch(`${URL_2020}/6`, {
      method: "POST",
      body: JSON.stringify({
        id_mobile: user,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  //Actualizacion datos del broker asociado al usuario registrado
  updateDatosBroker(
    user,
    tipo,
    nameBroker,
    companyBroker,
    teleBroker,
    cargoBroker
  ) {
    return fetch(`${URL_2020}/7`, {
      method: "POST",
      body: JSON.stringify({
        id_mobile: user,
        tipo: tipo,
        brk_name: nameBroker,
        brk_company: companyBroker,
        brk_telefono: teleBroker,
        brk_cargo: cargoBroker,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  updateMailBroker(user, tipo, mailBroker) {
    return fetch(`${URL_2020}/7`, {
      method: "POST",
      body: JSON.stringify({
        id_mobile: user,
        tipo: tipo,
        brk_mail: mailBroker,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  updateTokenBroker(user, tipo, token) {
    return fetch(`${URL_2020}/7`, {
      method: "POST",
      body: JSON.stringify({
        id_mobile: user,
        tipo: tipo,
        brk_token: token,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }
  //Fin de actualizacion datos del broker

  //Traer los miembros de un Brokerhood
  getBrokerhoodMembers(idBrokerhood) {
    return fetch(`${URL_2020}/8`, {
      method: "POST",
      body: JSON.stringify({
        bkh_id: idBrokerhood,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  //Traer los miembros de un Brokerhood
  getFindBrokers(idBrokerhood, nombreBroker, emailBroker, telefonoBroker) {
    return fetch(`${URL_2020}/10`, {
      method: "POST",
      body: JSON.stringify({
        bkh_id: idBrokerhood,
        brk_name: nombreBroker,
        brk_mail: emailBroker,
        brk_telefono: telefonoBroker,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  //Traer los miembros de un Brokerhood
  getFindBrokers2(idBrokerhood, nombreBroker) {
    return fetch(`${URL_2020}/10`, {
      method: "POST",
      body: JSON.stringify({
        bkh_id: idBrokerhood,
        brk_name: nombreBroker,
        brk_mail: "",
        brk_telefono: "",
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  //Invitar contacto por email
  sendEmailContact(idBrokerhood, email) {
    return fetch(`${URL_2020}/11`, {
      method: "POST",
      body: JSON.stringify({
        bkh_id: idBrokerhood,
        contact_email: email,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  //Creacion del brokerhood y el mienbro admin
  addMemberBroker(idBrokerhood, nmBrokerhood, brk_id, email) {
    return fetch(`${URL_2020}/12`, {
      method: "POST",
      body: JSON.stringify({
        bkh_id: idBrokerhood,
        bkh_name: nmBrokerhood,
        brk_id: brk_id,
        email: email,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  getTiposEstate(bkh_id) {
    return fetch(`${URL_2020}/13`, {
      method: "POST",
      body: JSON.stringify({
        tipo: 2,
        bkh_id: bkh_id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  //Creacion del brokerhood y el mienbro admin
  createOffer(
    brokerhood,
    imagesSelected,
    tipoEstate,
    motivoEstate,
    areaEstate,
    loteEstate,
    precioEstate,
    alcobasEstate,
    banosEstate,
    parkingEstate,
    nameEstate,
    addressEstate,
    describeEstate,
    latitudEstate,
    longitudEstate,
    latitudDeltaEstate,
    longitudDeltaEstate,
    zonaEstate
  ) {
    console.log(brokerhood);
    let _uri = imagesSelected[0];
    let uploadData = new FormData();
    uploadData.append("submit", "ok");
    uploadData.append("bkh_id", brokerhood.bkh_id);
    uploadData.append("brk_id", brokerhood.brk_id);
    uploadData.append("tin_id", tipoEstate);
    uploadData.append("mtv_id", motivoEstate);
    uploadData.append("ofr_area", areaEstate);
    uploadData.append("ofr_lote", loteEstate);
    uploadData.append("ofr_precio", precioEstate);
    uploadData.append("ofr_alcobas", alcobasEstate);
    uploadData.append("ofr_banos", banosEstate);
    uploadData.append("ofr_parking", parkingEstate);
    uploadData.append("ofr_name", nameEstate);
    uploadData.append("ofr_address", addressEstate);
    uploadData.append("ofr_nota", describeEstate);
    uploadData.append("ofr_latitud", latitudEstate);
    uploadData.append("ofr_latitudDelta", latitudDeltaEstate);
    uploadData.append("ofr_longitud", longitudEstate);
    uploadData.append("ofr_longitudDelta", longitudDeltaEstate);
    uploadData.append("zna_id", zonaEstate);
    uploadData.append("ofr_image1", {
      type: "image/jpeg",
      uri: Platform.OS === "ios" ? _uri.replace("file://", "") : _uri,
      name: "uploadimagetmp.jpg",
    });
    if (imagesSelected.length > 1) {
      let _uri2 = imagesSelected[1];
      uploadData.append("ofr_image2", {
        type: "image/jpeg",
        uri: Platform.OS === "ios" ? _uri2.replace("file://", "") : _uri2,
        name: "uploadimagetmp.jpg",
      });
    }
    if (imagesSelected.length > 2) {
      let _uri3 = imagesSelected[2];
      uploadData.append("ofr_image3", {
        type: "image/jpeg",
        uri: Platform.OS === "ios" ? _uri3.replace("file://", "") : _uri3,
        name: "uploadimagetmp.jpg",
      });
    }
    if (imagesSelected.length > 3) {
      let _uri4 = imagesSelected[3];
      uploadData.append("ofr_image4", {
        type: "image/jpeg",
        uri: Platform.OS === "ios" ? _uri4.replace("file://", "") : _uri4,
        name: "uploadimagetmp.jpg",
      });
    }
    if (imagesSelected.length > 4) {
      let _uri5 = imagesSelected[4];
      uploadData.append("ofr_image5", {
        type: "image/jpeg",
        uri: Platform.OS === "ios" ? _uri5.replace("file://", "") : _uri5,
        name: "uploadimagetmp.jpg",
      });
    }
    const headers = new Headers();
    headers.append("accept", "application/json");
    return fetch(`${URL_2020}/14`, {
      method: "POST",
      body: uploadData,
      headers,
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  //Creacion del brokerhood y el mienbro admin
  createOrder(
    brokerhood,
    tipoEstate,
    motivoEstate,
    areaEstate,
    loteEstate,
    curInicial,
    curFinal,
    alcobasEstate,
    banosEstate,
    parkingEstate,
    addressEstate,
    describeEstate,
    bkhComunas
  ) {
    return fetch(`${URL_2020}/15`, {
      method: "POST",
      body: JSON.stringify({
        bkh_id: brokerhood.bkh_id,
        brk_id: brokerhood.brk_id,
        mbr_id: brokerhood.id,
        tin_id: tipoEstate,
        mtv_id: motivoEstate,
        ord_area: areaEstate,
        ord_lote: loteEstate,
        ord_desde: curInicial,
        ord_hasta: curFinal,
        ord_alcobas: alcobasEstate,
        ord_banos: banosEstate,
        ord_parking: parkingEstate,
        ord_address: addressEstate,
        ord_nota: describeEstate,
        ord_zonas: bkhComunas,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  //Creacion del brokerhood y el mienbro admin
  updateMember(idMember, idBroker, idBHood, tipo) {
    return fetch(`${URL_2020}/18`, {
      method: "POST",
      body: JSON.stringify({
        id: idMember,
        brk_id: idBroker,
        bkh_id: idBHood,
        estado: tipo,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  //Creacion del brokerhood y el mienbro admin
  deleteOfferOrder(id, idBroker, idBHood, tipo) {
    return fetch(`${URL_2020}/21`, {
      method: "POST",
      body: JSON.stringify({
        id: id,
        brk_id: idBroker,
        bkh_id: idBHood,
        estado: tipo,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  //Creacion de mensajes
  registerMessage(fuente, matchesOrder, newMessage) {
    return fetch(`${URL_2020}/16`, {
      method: "POST",
      body: JSON.stringify({
        brk_id: fuente === 1 ? matchesOrder.id_ord : matchesOrder.id_ofr,
        cnc_id: matchesOrder.id,
        id_ord: fuente === 1 ? matchesOrder.id_ord : matchesOrder.id_ofr,
        id_ofr: fuente === 1 ? matchesOrder.id_ofr : matchesOrder.id_ord,
        msg_texto: newMessage,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }

  //Finalizacion del Match... declinado o aprobado
  cerrarMatch(fuente, estado, tipo, matchesOrder, newMessage) {
    return fetch(`${URL_2020}/20`, {
      method: "POST",
      body: JSON.stringify({
        brk_id: fuente === 1 ? matchesOrder.id_ord : matchesOrder.id_ofr,
        cnc_estado: estado,
        cnc_tipo_cierre: tipo,
        cnc_id: matchesOrder.id,
        id_ord: matchesOrder.id_ord,
        id_ofr: matchesOrder.id_ofr,
        cnc_nota_cierre: newMessage,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => Alert.alert("Error Inesperado", "Solicite Soporte"))
      .then((response) => response);
  }
  //Registro del ctach
}

export default new SRV();
