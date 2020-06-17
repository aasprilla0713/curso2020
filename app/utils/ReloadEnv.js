import SRV from "./Service";
import { getItem, validItem, updateItem, saveItem } from "./Storage";
import {
  USER_INFO,
  USER_BHOODS,
  USER_CIUDADES,
  USER_COMUNAS,
  USER_ZONAS,
  USER_MIEMBROS,
  USER_OFERTAS,
  USER_PEDIDOS,
  USER_PEDIDOS_ZONAS,
  USER_BHOODS_COMUNAS,
  USER_BHOODS_ZONAS,
  TIPOS_INMUEBLE,
  USER_MATCHES_ORD,
  USER_MATCHES_OFR,
  USER_MESSAGES,
  USER_MATCHES,
  USER_CATCHES,
  USER_HITS,
  USER_BHOODS_INV,
  COMUNAS_INV,
  MEMBERS_INV,
  OFERTAS_INV,
  PEDIDOS_INV,
  PEDIDOS_ZONAS_INV,
  MATCHES_INV,
  CATCHES_INV,
  GESTION_GEN,
  TOP_COMPRA,
  TOP_VENTA,
  TOP_COMPRA_BRK,
  TOP_VENTA_BRK,
} from "../constants";
import * as firebase from "firebase";
import { Alert } from "react-native";

export const reloadData = async () => {
  try {
    const resultBrokerhoods = [];
    const curr_user = firebase.auth().currentUser.uid;
    let datos = await SRV.getBroker(curr_user, 1);
    console.log(datos.type);
    if (datos) {
      const usrAnt = await validItem(USER_INFO);
      if (usrAnt) {
        const userResult = await updateItem(
          USER_INFO,
          JSON.stringify(datos.broker)
        );
      } else {
        const userResult = await saveItem(
          USER_INFO,
          JSON.stringify(datos.broker)
        );
      }
      const search = "";
      let bhoods = datos.brokerhoods;
      bhoods.forEach((bhood) => {
        let brokerhood = bhood;
        resultBrokerhoods.push(brokerhood);
      });
      const bhoodsResult = await saveItem(
        USER_BHOODS,
        JSON.stringify(resultBrokerhoods)
      );
      let invita = datos.brokerhoods_inv;
      const invitaResult = await saveItem(
        USER_BHOODS_INV,
        JSON.stringify(invita)
      );
      let members = datos.members;
      const membersResult = await saveItem(
        USER_MIEMBROS,
        JSON.stringify(members)
      );
      let bhcomunas = datos.bh_comunas;
      const bhcomunasResult = await saveItem(
        USER_BHOODS_COMUNAS,
        JSON.stringify(bhcomunas)
      );
      let bhzonas = datos.bh_zonas;
      const bhzonasResult = await saveItem(
        USER_BHOODS_ZONAS,
        JSON.stringify(bhzonas)
      );
      let tipos_inm = datos.tipos_inm;
      const tiposInmResult = await saveItem(
        TIPOS_INMUEBLE,
        JSON.stringify(tipos_inm)
      );
      let cities = datos.ciudades;
      const citiesResult = await saveItem(
        USER_CIUDADES,
        JSON.stringify(cities)
      );
      let comunas = datos.comunas;
      const comunasResult = await saveItem(
        USER_COMUNAS,
        JSON.stringify(comunas)
      );
      let zonas = datos.zonas;
      const zonasResult = await saveItem(USER_ZONAS, JSON.stringify(zonas));
      let ofertas = datos.ofertas;
      const ofertasResult = await saveItem(
        USER_OFERTAS,
        JSON.stringify(ofertas)
      );
      let pedidos = datos.ordenes;
      const pedidosResult = await saveItem(
        USER_PEDIDOS,
        JSON.stringify(pedidos)
      );
      let pedidos_znas = datos.ord_zonas;
      const pedzonasResult = await saveItem(
        USER_PEDIDOS_ZONAS,
        JSON.stringify(pedidos_znas)
      );
      let matches_ord = datos.matches_ord;
      const matches_ordResult = await saveItem(
        USER_MATCHES_ORD,
        JSON.stringify(matches_ord)
      );
      let matches_ofr = datos.matches_ofr;
      const matches_ofrResult = await saveItem(
        USER_MATCHES_OFR,
        JSON.stringify(matches_ofr)
      );
      let messages_usr = datos.messages;
      const messagesResult = await saveItem(
        USER_MESSAGES,
        JSON.stringify(messages_usr)
      );
      let broker_hit = datos.broker_hit;
      const hitsResult = await saveItem(USER_HITS, JSON.stringify(broker_hit));
      let broker_ctc = datos.broker_catch;
      const catchResult = await saveItem(
        USER_CATCHES,
        JSON.stringify(broker_ctc)
      );
      let comunas_inv = datos.bh_comunas_inv;
      const cominvResult = await saveItem(
        COMUNAS_INV,
        JSON.stringify(comunas_inv)
      );
      let members_inv = datos.members_inv;
      const meminvResult = await saveItem(
        MEMBERS_INV,
        JSON.stringify(members_inv)
      );
      let ofertas_inv = datos.ofertas_inv;
      const ofrinvResult = await saveItem(
        OFERTAS_INV,
        JSON.stringify(ofertas_inv)
      );
      let ordenes_inv = datos.ordenes_inv;
      const ordinvResult = await saveItem(
        PEDIDOS_INV,
        JSON.stringify(ordenes_inv)
      );
      let ordcmn_inv = datos.ord_zonas_inv;
      const ordznainvResult = await saveItem(
        PEDIDOS_ZONAS_INV,
        JSON.stringify(ordcmn_inv)
      );
      let matches_inv = datos.matches_inv;
      const matchsResult = await saveItem(
        MATCHES_INV,
        JSON.stringify(matches_inv)
      );
      let catches_inv = datos.catches_inv;
      const catinvResult = await saveItem(
        CATCHES_INV,
        JSON.stringify(catches_inv)
      );
      let gestion_gen = datos.gestion_gen;
      const gestionResult = await saveItem(
        GESTION_GEN,
        JSON.stringify(gestion_gen)
      );
      let top_venta = datos.top_venta;
      const topvntResult = await saveItem(TOP_VENTA, JSON.stringify(top_venta));
      let top_venta_brk = datos.top_venta_brk;
      const topvntbResult = await saveItem(
        TOP_VENTA_BRK,
        JSON.stringify(top_venta_brk)
      );
      let top_compra = datos.top_compra;
      const topcmpResult = await saveItem(
        TOP_COMPRA,
        JSON.stringify(top_compra)
      );
      let top_compra_brk = datos.top_compra_brk;
      const topcmpbResult = await saveItem(
        TOP_COMPRA_BRK,
        JSON.stringify(top_compra_brk)
      );
    } else {
      return false;
      Alert.alert("Error Inesperado", "Intente mas Tarde");
    }
    const respuesta = {
      broker: datos.broker,
      matches_ord: datos.matches_ord,
      matches_ofr: datos.matches_ofr,
    };
    return respuesta;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const reloadInfo = async (datos) => {
  try {
    let cities = datos.ciudades;
    const citiesResult = await saveItem(USER_CIUDADES, JSON.stringify(cities));
    let comunas = datos.comunas;
    const comunasResult = await saveItem(USER_COMUNAS, JSON.stringify(comunas));
    let zonas = datos.zonas;
    const zonasResult = await saveItem(USER_ZONAS, JSON.stringify(zonas));
    let bhoods = datos.brokerhoods;
    const bhoodsResult = await saveItem(USER_BHOODS, JSON.stringify(bhoods));
    let members = datos.members;
    let invita = datos.brokerhoods_inv;
    const invitaResult = await saveItem(
      USER_BHOODS_INV,
      JSON.stringify(invita)
    );
    const membersResult = await saveItem(
      USER_MIEMBROS,
      JSON.stringify(members)
    );
    let bhcomunas = datos.bh_comunas;
    const bhcomunasResult = await saveItem(
      USER_BHOODS_COMUNAS,
      JSON.stringify(bhcomunas)
    );
    let bhzonas = datos.bh_zonas;
    const bhzonasResult = await saveItem(
      USER_BHOODS_ZONAS,
      JSON.stringify(bhzonas)
    );
    let ofertas = datos.ofertas;
    const ofertasResult = await saveItem(USER_OFERTAS, JSON.stringify(ofertas));
    let pedidos = datos.ordenes;
    const pedidosResult = await saveItem(USER_PEDIDOS, JSON.stringify(pedidos));
    let pedidos_znas = datos.ord_zonas;
    const pedzonasResult = await saveItem(
      USER_PEDIDOS_ZONAS,
      JSON.stringify(pedidos_znas)
    );
    let matches_ord = datos.matches_ord;
    const matches_ordResult = await saveItem(
      USER_MATCHES_ORD,
      JSON.stringify(matches_ord)
    );
    let matches_ofr = datos.matches_ofr;
    const matches_ofrResult = await saveItem(
      USER_MATCHES_OFR,
      JSON.stringify(matches_ofr)
    );
    let messages_usr = datos.messages;
    const messagesResult = await saveItem(
      USER_MESSAGES,
      JSON.stringify(messages_usr)
    );
    let broker_hit = datos.broker_hit;
    const hitsResult = await saveItem(USER_HITS, JSON.stringify(broker_hit));
    let broker_ctc = datos.broker_catch;
    const catchResult = await saveItem(
      USER_CATCHES,
      JSON.stringify(broker_ctc)
    );
    let comunas_inv = datos.bh_comunas_inv;
    const cominvResult = await saveItem(
      COMUNAS_INV,
      JSON.stringify(comunas_inv)
    );
    let members_inv = datos.members_inv;
    const meminvResult = await saveItem(
      MEMBERS_INV,
      JSON.stringify(members_inv)
    );
    let ofertas_inv = datos.ofertas_inv;
    const ofrinvResult = await saveItem(
      OFERTAS_INV,
      JSON.stringify(ofertas_inv)
    );
    let ordenes_inv = datos.ordenes_inv;
    const ordinvResult = await saveItem(
      PEDIDOS_INV,
      JSON.stringify(ordenes_inv)
    );
    let ordcmn_inv = datos.ord_zonas_inv;
    const ordznainvResult = await saveItem(
      PEDIDOS_ZONAS_INV,
      JSON.stringify(ordcmn_inv)
    );
    let matches_inv = datos.matches_inv;
    const matchsResult = await saveItem(
      MATCHES_INV,
      JSON.stringify(matches_inv)
    );
    let catches_inv = datos.catches_inv;
    const catinvResult = await saveItem(
      CATCHES_INV,
      JSON.stringify(catches_inv)
    );
    let gestion_gen = datos.gestion_gen;
    const gestionResult = await saveItem(
      GESTION_GEN,
      JSON.stringify(gestion_gen)
    );
    let top_venta = datos.top_venta;
    const topvntResult = await saveItem(TOP_VENTA, JSON.stringify(top_venta));
    let top_venta_brk = datos.top_venta_brk;
    const topvntbResult = await saveItem(
      TOP_VENTA_BRK,
      JSON.stringify(top_venta_brk)
    );
    let top_compra = datos.top_compra;
    const topcmpResult = await saveItem(TOP_COMPRA, JSON.stringify(top_compra));
    let top_compra_brk = datos.top_compra_brk;
    const topcmpbResult = await saveItem(
      TOP_COMPRA_BRK,
      JSON.stringify(top_compra_brk)
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const cargarCiudades = async () => {
  let list_ct = await getItem(USER_CIUDADES);
  list_ct = JSON.parse(list_ct);
  return list_ct;
};

export const cargarTopCity = async () => {
  let list_ct = await getItem(TOP_VENTA);
  console.log(list_ct);
  list_ct = JSON.parse(list_ct);
  return list_ct;
};

export const cargarBhoods = async () => {
  let list_bh = await getItem(USER_BHOODS);
  list_bh = JSON.parse(list_bh);
  return list_bh;
};

export const cargarBhoodsInv = async () => {
  let list_bh = await getItem(USER_BHOODS_INV);
  list_bh = JSON.parse(list_bh);
  return list_bh;
};

export const getTiposInmueble = async () => {
  let list_tin = await getItem(TIPOS_INMUEBLE);
  list_tin = JSON.parse(list_tin);
  return list_tin;
};

export const getComunas = async (city) => {
  //Se obtiemem las comunas generales
  let list_comunas_gen = await getItem(USER_COMUNAS);
  const list_comunas = JSON.parse(list_comunas_gen);
  //Se filtran las comunas de la ciudad
  const comunasFltr = list_comunas.filter((comuna) => {
    return Number.parseInt(comuna.ciu_id) === Number.parseInt(city);
  });
  return comunasFltr;
};

export const getZonasGen = async (cmnId) => {
  //Se obtiemem las zonas del BrokerHood
  let list_zonas_gen = await getItem(USER_ZONAS);
  const list_zonas = JSON.parse(list_zonas_gen);
  //Se filtran las comunas del BH
  const zonasFltr = list_zonas.filter((zona) => {
    return Number.parseInt(zona.cmn_id) === Number.parseInt(cmnId);
  });
  return zonasFltr;
};

export const getZonas = async (bkhId) => {
  //Se obtiemem las zonas del BrokerHood
  let list_zonas_bh = await getItem(USER_BHOODS_ZONAS);
  const list_zonas = JSON.parse(list_zonas_bh);
  //Se filtran las comunas del BH
  const zonasFltr = list_zonas.filter((zona) => {
    return Number.parseInt(zona.bkh_id) === Number.parseInt(bkhId);
  });
  return zonasFltr;
};

export const getMatchesOrd = async () => {
  let list_mt = await getItem(USER_MATCHES_ORD);
  list_mt = JSON.parse(list_mt);
  return list_mt;
};

export const getMatchesOfr = async () => {
  let list_mt = await getItem(USER_MATCHES_OFR);
  list_mt = JSON.parse(list_mt);
  return list_mt;
};

export const getMessagesUsr = async (cncId) => {
  let list_msg = await getItem(USER_MESSAGES);
  const list_msgs = JSON.parse(list_msg);
  //Se filtran las mensajes del Match
  const messagesFltr = list_msgs.filter((msgs) => {
    return msgs.cnc_id === cncId;
  });
  return messagesFltr;
};

export const cargarOffers = async () => {
  let list_of = await getItem(USER_OFERTAS);
  list_of = JSON.parse(list_of);
  return list_of;
};

export const cargarOrders = async () => {
  let list_pd = await getItem(USER_PEDIDOS);
  list_pd = JSON.parse(list_pd);
  return list_pd;
};

export const getTopVenta = async (city) => {
  let list_vnt = await getItem(TOP_VENTA_BRK);
  list_vnt = JSON.parse(list_vnt);
  const topvntFltr = list_vnt.filter((vnts) => {
    return vnts.cid_id === city;
  });
  return topvntFltr;
};

export const getTopCompra = async (city) => {
  let list_buy = await getItem(TOP_COMPRA_BRK);
  list_buy = JSON.parse(list_buy);
  const topbuyFltr = list_buy.filter((buys) => {
    return buys.cid_id === city;
  });
  return topbuyFltr;
};

function filtrarCiu() {
  return true;
}
