import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import { SearchBar, Icon, Image, Text } from "react-native-elements";
import { SwipeListView } from "react-native-swipe-list-view";
import CST from "../../utils/CustomSettings";
import { URL_OFFERT } from "../../constants";
import AvatarCache from "../../utils/AvatarCache";
import { reloadInfo } from "../../utils/ReloadEnv";
import SRV from "../../utils/Service";
import { MainContext } from "../../context/MainContext";

export default function MyBrokersOffersForm(props) {
  const {
    navigation,
    brokerOffers,
    brokerInfo,
    setBrokerOffers,
    inMemoryOffers,
    setIsReloadBrokerOffers,
    setIsLoading,
  } = props;
  //console.log(props);
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
        onPress={() => updateOffer(data.item, 1)}
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
    const mensaje = "¿Desea ELIMINAR LA OFERTA?";
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

  const filtrarOffers = (search) => {
    const filteredBokerOffers = inMemoryOffers.filter((datos) => {
      let brokerhoodLowerCase = datos.ofr_criterio.toLowerCase();
      let searchLowerCase = search.toLowerCase();

      return brokerhoodLowerCase.indexOf(searchLowerCase) > -1;
    });
    setBrokerOffers(filteredBokerOffers);
  };

  useEffect(() => {
    //Se buscan los brokerhoods
    if (search) {
      filtrarOffers(search);
    } else {
      setBrokerOffers(inMemoryOffers);
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
      {brokerOffers.length === 0 ? (
        <NotFoundOffers />
      ) : (
        <SwipeListView
          style={{}}
          data={brokerOffers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(data, rowMap) => (
            <BrokerOffer data={data} navigation={navigation} />
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

function BrokerOffer(props) {
  const { data, navigation } = props;
  const {
    id,
    tin_nombre,
    zna_nombre,
    ofr_nota,
    ofr_image1,
    ofr_precio,
    tin_abrevia,
  } = data.item;
  return (
    <TouchableHighlight
      style={styles.touchHigh}
      underlayColor="#fff"
      onPress={() =>
        navigation.navigate("ShowOffer", {
          offert: data.item,
          navigation: navigation,
        })
      }
    >
      <View style={styles.viewBrokerhood}>
        <View style={styles.viewBrokerhoodImage}>
          <AvatarCache
            uri={URL_OFFERT + ofr_image1}
            size="large"
            style={styles.imageBrokerhood}
            PlaceholderContent={<ActivityIndicator color="#fff" />}
          />
        </View>
        <View>
          <Text style={styles.brokerhoodName}>
            {tin_abrevia} {zna_nombre} ${Number.parseInt(ofr_precio)}M
          </Text>
          <Text style={styles.brokerhoodDescription}>
            {ofr_nota.substr(0, 30)}...
          </Text>
        </View>
        <Icon
          type="material-community"
          name="chevron-right"
          color="#CED2D2"
          containerStyle={styles.listRight}
          size={40}
          underlayColor="#fff"
        />
      </View>
    </TouchableHighlight>
  );
}

function NotFoundOffers() {
  return (
    <View style={{ alignItems: "center", marginTop: 40 }}>
      <Image
        source={require("../../../assets/img/logo-login.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text h4 style={{ color: CST.colorSec }}>
        SIN OFERTAS
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
    margin: 2,
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
    textTransform: "capitalize",
  },
  brokerhoodDescription: {
    paddingTop: 2,
    paddingBottom: 4,
    color: "grey",
    width: 300,
    fontSize: 15,
    textTransform: "capitalize",
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
});
