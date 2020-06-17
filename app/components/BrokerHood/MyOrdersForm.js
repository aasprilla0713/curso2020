import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import {
  SearchBar,
  Icon,
  Image,
  Text,
  Card,
  ListItem,
} from "react-native-elements";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import CST from "../../utils/CustomSettings";
import { reloadInfo } from "../../utils/ReloadEnv";
import SRV from "../../utils/Service";
import { MainContext } from "../../context/MainContext";

export default function MyBrokersOrdersForm(props) {
  const {
    navigation,
    brokerOrders,
    brokerInfo,
    setBrokerOrders,
    inMemoryOrders,
    setIsReloadBrokerOffers,
    setIsLoading,
  } = props;
  console.log(props);
  const [userInfo, setUserInfo] = useState(brokerInfo);
  const [search, setSearch] = useState("");

  //Renderizo las funciones para actualizar el Context
  const { setInfoBroker, setMatchesOfr, setMatchesOrd } = useContext(
    MainContext
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backLeftBtn, styles.backLeftBtnLeft]}
        onPress={() => updateOffer(data.item, 2)}
      >
        <Icon
          type="material-community"
          name="trash-can-outline"
          color="#fff"
          containerStyle={styles.listIcon}
          size={35}
          underlayColor="#fff"
        />
        <Text style={styles.backTextWhite}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const updateOffer = async (item, tipo) => {
    //console.log(item);
    const mensaje = "¿Desea ELIMINAR EL PEDIDO?";
    const txtBtn = "ELIMINAR";
    Alert.alert(
      "Ofertas",
      mensaje,
      [
        {
          text: "Cencelar",
          style: "cancel",
        },
        {
          text: txtBtn,
          onPress: async () => {
            setIsLoading(true);
            let val_broker = await SRV.deleteOfferOrder(
              item.id,
              item.brk_id,
              item.bkh_id,
              tipo
            );
            if (val_broker.type > 0) {
              let updInfo = await reloadInfo(val_broker.datos);
              setInfoBroker(val_broker.datos.broker);
              setMatchesOfr(val_broker.datos.matches_ofr);
              setMatchesOrd(val_broker.datos.matches_ord);
              navigation.navigate("MyAccount");
            } else {
              setIsLoading(false);
              Alert.alert("Error", "val_broker.message");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const filtrarOrders = (search) => {
    const filteredBokerOrders = inMemoryOrders.filter((datos) => {
      let brokerhoodLowerCase = datos.ord_criterio.toLowerCase();
      let searchLowerCase = search.toLowerCase();

      return brokerhoodLowerCase.indexOf(searchLowerCase) > -1;
    });
    setBrokerOrders(filteredBokerOrders);
  };

  useEffect(() => {
    //Se buscan los brokerhoods
    if (search) {
      filtrarOrders(search);
    } else {
      setBrokerOrders(inMemoryOrders);
    }
  }, [search]);

  return (
    <View style={styles.viewBody}>
      <SearchBar
        placeholder="Criterio a Buscar..."
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.inputSearh}
        inputStyle={styles.textStyle}
      />
      {brokerOrders.length === 0 ? (
        <NotFoundOrders />
      ) : (
        <SwipeListView
          style={{}}
          data={brokerOrders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(data, rowMap) => (
            <BrokerOrder data={data} navigation={navigation} />
          )}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
        />
      )}
    </View>
  );
}

function BrokerOrder(props) {
  const { data, navigation } = props;
  console.log(data);
  const {
    id,
    tin_abrevia,
    tin_nombre,
    mtv_nombre,
    ord_zonas,
    ord_nota,
    ord_desde,
    ord_hasta,
    ord_area,
    ord_alcobas,
    ord_banos,
    ord_parking,
    ord_address,
    ord_lote,
  } = data.item;
  return (
    <View style={[styles.viewReview, { backgroundColor: "#fff" }]}>
      <ListItem
        key={1}
        title={tin_nombre + " PARA " + mtv_nombre}
        titleStyle={[
          styles.textAmenity,
          {
            paddingRight: 10,
            fontWeight: "600",
            color: CST.colorPrm,
          },
        ]}
        chevron
        bottomDivider
      />
      <ListItem
        key={2}
        title={
          "PRECIO ENTRE $" +
          Number.parseInt(ord_desde) +
          "M Y $" +
          Number.parseInt(ord_hasta) +
          "M"
        }
        titleStyle={styles.textAmenity}
        bottomDivider
      />
      <ListItem key={3} title={ord_zonas} bottomDivider />
      <ListItem key={4} title={ord_address} bottomDivider />
      <View
        style={[
          styles.viewFormMedia,
          { marginTop: 15, marginHorizontal: 15, backgroundColor: "#fff" },
        ]}
      >
        <Text style={styles.textAmenity}>
          {"Area: " + Number.parseInt(ord_area)}mts
        </Text>
        <MaterialCommunityIcons
          name="floor-plan"
          size={25}
          color={CST.colorPrm}
        />
        <Text style={styles.textAmenity}>
          {"Lote: " + Number.parseInt(ord_lote)}mts
        </Text>
        <FontAwesome name="map-o" size={20} color={CST.colorPrm} />
      </View>
      <View
        style={[
          styles.viewFormMedia,
          { marginTop: 15, marginHorizontal: 15, backgroundColor: "#fff" },
        ]}
      >
        <Text style={styles.textAmenity}>{ord_alcobas}</Text>
        <FontAwesome name="bed" size={25} color={CST.colorPrm} />
        <Text style={styles.textAmenity}>{ord_banos}</Text>
        <MaterialCommunityIcons name="toilet" size={25} color={CST.colorPrm} />
        <Text style={styles.textAmenity}>{ord_parking}</Text>
        <AntDesign name="car" size={25} color={CST.colorPrm} />
      </View>
    </View>
  );
}

function NotFoundOrders() {
  return (
    <View style={{ alignItems: "center", marginTop: 40 }}>
      <Image
        source={require("../../../assets/img/logo-login.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text h4 style={{ color: CST.colorSec }}>
        SIN PEDIDOS
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  searchBar: {
    marginBottom: 1,
    backgroundColor: CST.colorPrm,
    padding: 3,
    borderWidth: 0,
  },
  inputSearh: {
    backgroundColor: "transparent",
  },
  textStyle: {
    color: "white",
  },
  itemList: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 80,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 5,
  },
  backLeftBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backLeftBtnLeft: {
    backgroundColor: "#DB4437",
    left: 0,
  },
  backLeftBtnLeftInv: {
    backgroundColor: "#F4B400",
    left: 0,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "#AAB5C1",
    right: 75,
  },
  backRightBtnCenter: {
    backgroundColor: "#65A4CA",
    right: 0,
  },
  listIcon: {
    top: 0,
  },
  listRight: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  viewBrokerhood: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 2,
    padding: 5,
  },
  viewBrokerhoodImage: {
    marginRight: 15,
  },
  imageBrokerhood: {
    width: 50,
    height: 50,
  },
  brokerhoodName: {
    fontWeight: "bold",
    marginTop: 4,
    fontSize: 16,
  },
  brokerhoodDescription: {
    paddingTop: 2,
    paddingBottom: 4,
    color: "grey",
    fontSize: 15,
  },
  touchHigh: {
    backgroundColor: "white",
    padding: 0,
    borderWidth: 0,
  },
  logo: {
    width: 200,
    height: 200,
  },
  viewReview: {
    marginBottom: 5,
    marginVertical: 3,
    marginHorizontal: 3,
    borderWidth: 0.4,
    borderColor: CST.colorPrm,
  },
  viewFormMedia: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  textAmenity: {
    fontSize: 16,
  },
});
