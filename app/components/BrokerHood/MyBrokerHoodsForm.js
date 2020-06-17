import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Alert,
} from "react-native";
import { SearchBar, Icon, Image, Text } from "react-native-elements";
import { SwipeListView } from "react-native-swipe-list-view";
import CST from "../../utils/CustomSettings";
import AvatarCache from "../../utils/AvatarCache";
import { URL_AVATAR } from "../../constants";
import SRV from "../../utils/Service";
import { MainContext } from "../../context/MainContext";

const screenWidth = Dimensions.get("window").width;

export default function MyBrokersHoodsForm(props) {
  const {
    navigation,
    brokerHoods,
    brokerInfo,
    setBrokerHoods,
    inMemoryBhoods,
    setIsReloadBrokerhoods,
    setIsLoading,
  } = props;
  const [userInfo, setUserInfo] = useState(brokerInfo);
  const [search, setSearch] = useState("");
  const [existeBHoods, setExisteBHoods] = useState(1);

  //Renderizo las funciones para actualizar el Context
  const { setInfoBroker, setMatchesOfr, setMatchesOrd } = useContext(
    MainContext
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[
          styles.backLeftBtn,
          data.item.mbr_admin
            ? styles.backLeftBtnLeft
            : styles.backLeftBtnLeftInv,
        ]}
        onPress={() => updateInvite(data.item, data.item.mbr_admin ? 4 : 3)}
      >
        <Icon
          type="material-community"
          name={
            data.item.mbr_admin ? "trash-can-outline" : "account-multiple-minus"
          }
          color="#fff"
          containerStyle={styles.listIcon}
          size={35}
          underlayColor="#fff"
        />
        <Text style={styles.backTextWhite}>
          {data.item.mbr_admin ? "Eliminar" : "Salir"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() =>
          navigation.navigate("AddOffer", {
            navigation: navigation,
            brokerhood: data.item,
          })
        }
      >
        <Icon
          type="material-community"
          name="city-variant-outline"
          color="#fff"
          containerStyle={styles.listIcon}
          size={35}
          underlayColor="#fff"
        />
        <Text style={styles.backTextWhite}>Oferta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnCenter]}
        onPress={() =>
          navigation.navigate("AddOrder", {
            navigation: navigation,
            brokerhood: data.item,
          })
        }
      >
        <Icon
          type="material-community"
          name="home-city-outline"
          color="#fff"
          containerStyle={styles.listIcon}
          size={35}
          underlayColor="#fff"
        />
        <Text style={styles.backTextWhite}>Peticion</Text>
      </TouchableOpacity>
    </View>
  );

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const updateInvite = async (item, tipo) => {
    console.log(item);
    const mensaje =
      tipo === 4
        ? "¿Desea ELIMINAR EL BROKERHOOD?"
        : "¿Desea SALIR DEL BROKERHOOD?";
    const txtBtn = tipo === 4 ? "ELIMINAR" : "SALIR";
    Alert.alert(
      "BrokerHood",
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
            let val_broker = await SRV.updateMember(
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
              setIsLoading(false);
              setIsReloadBrokerhoods(true);
            } else {
              setIsLoading(false);
              Alert.alert("Error", "val_broker.message");
              //toastRef.current.show(val_broker.message, 2000);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const filtrarBhoods = (search) => {
    const filteredBokerhoods = inMemoryBhoods.filter((datos) => {
      let brokerhoodLowerCase = datos.bkh_nombre.toLowerCase();
      let searchLowerCase = search.toLowerCase();

      return brokerhoodLowerCase.indexOf(searchLowerCase) > -1;
    });
    setBrokerHoods(filteredBokerhoods);
  };

  useEffect(() => {
    //Se buscan los brokerhoods
    if (existeBHoods === 1) {
      if (search) {
        filtrarBhoods(search);
      } else {
        setBrokerHoods(inMemoryBhoods);
      }
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
      {brokerHoods.length === 0 ? (
        <NotFoundBrokers />
      ) : (
        <SwipeListView
          style={{}}
          data={brokerHoods}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(data, rowMap) => (
            <Brokerhood data={data} navigation={navigation} />
          )}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
        />
      )}
    </View>
  );
}

function Brokerhood(props) {
  const { data, navigation } = props;
  const { bkh_id, bkh_nombre, bkh_asunto, bkh_avatar } = data.item;
  return (
    <TouchableHighlight
      style={styles.touchHigh}
      underlayColor="#fff"
      onPress={() =>
        navigation.navigate("Brokerhood", {
          brokerhood: data.item,
          navigation: navigation,
        })
      }
    >
      <View style={styles.viewBrokerhood}>
        <View style={styles.viewBrokerhoodImage}>
          <AvatarCache
            uri={URL_AVATAR + bkh_avatar}
            size="large"
            style={styles.imageBrokerhood}
            PlaceholderContent={<ActivityIndicator color="#fff" />}
          />
        </View>
        <View>
          <Text style={styles.brokerhoodName}>
            {bkh_nombre.substr(0, 20)}...
          </Text>
          <Text style={styles.brokerhoodDescription}>
            {bkh_asunto.substr(0, 25)}...
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

function NotFoundBrokers() {
  return (
    <View style={{ alignItems: "center", marginTop: 40 }}>
      <Image
        source={require("../../../assets/img/logo-login.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text h4 style={{ color: CST.colorSec }}>
        SIN BROKERHOODS
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
    margin: 1,
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
    margin: 1,
    padding: 5,
    borderBottomWidth: 0.4,
    borderBottomColor: "#EAECF1",
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
