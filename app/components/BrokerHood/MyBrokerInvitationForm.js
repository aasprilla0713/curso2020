import React, { useState, useEffect } from "react";
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
import AvatarCache from "../../utils/AvatarCache";
import SRV from "../../utils/Service";
import { reloadInfo } from "../../utils/ReloadEnv";

export default function MyBrokersInvitationForm(props) {
  const {
    navigation,
    brokerInvita,
    brokerInfo,
    setBrokerInvita,
    inMemoryInvita,
    setIsLoading,
    setIsReloadBrokerhoods,
  } = props;
  console.log(props);
  const [userInfo, setUserInfo] = useState(brokerInfo);
  const [search, setSearch] = useState("");
  const [existeBHoods, setExisteBHoods] = useState(1);

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => updateInvite(data.item, 2)}
      >
        <Icon
          type="material-community"
          name="account-multiple-minus"
          color="#fff"
          containerStyle={styles.listIcon}
          size={35}
          underlayColor="#fff"
        />
        <Text style={styles.backTextWhite}>Declinar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnCenter]}
        onPress={() => updateInvite(data.item, 1)}
      >
        <Icon
          type="material-community"
          name="account-multiple-plus"
          color="#fff"
          containerStyle={styles.listIcon}
          size={35}
          underlayColor="#fff"
        />
        <Text style={styles.backTextWhite}>Aceptar</Text>
      </TouchableOpacity>
    </View>
  );

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const updateInvite = async (item, tipo) => {
    console.log(item);
    const mensaje =
      tipo === 1
        ? "¿Desea ACEPTAR la invitacion?"
        : "¿Desea DECLINAR la invitacion?";
    const txtBtn = tipo === 1 ? "ACEPTAR" : "DECLINAR";
    Alert.alert(
      "Invitacion",
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
              setIsLoading(false);
              setIsReloadBrokerhoods(true);
              navigation.navigate("MyBrokerHoods");
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
    const filteredBokerhoods = inMemoryInvita.filter((datos) => {
      let brokerhoodLowerCase = datos.bkh_nombre.toLowerCase();
      let searchLowerCase = search.toLowerCase();

      return brokerhoodLowerCase.indexOf(searchLowerCase) > -1;
    });
    setBrokerInvita(filteredBokerhoods);
  };

  useEffect(() => {
    //Se buscan los brokerhoods
    if (existeBHoods === 1) {
      if (search) {
        filtrarBhoods(search);
      } else {
        setBrokerInvita(inMemoryInvita);
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
      {brokerInvita.length === 0 ? (
        <NotFoundBrokers />
      ) : (
        <SwipeListView
          style={{}}
          data={brokerInvita}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(data, rowMap) => (
            <Brokerhood data={data} navigation={navigation} />
          )}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
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
        navigation.navigate("BrokerhoodInv", {
          brokerhood: data.item,
          navigation: navigation,
        })
      }
    >
      <View style={styles.viewBrokerhood}>
        <View style={styles.viewBrokerhoodImage}>
          <AvatarCache
            uri={
              "http://2020.aal-estate.com/files/brokerhood/avatar/" + bkh_avatar
            }
            size="large"
            style={styles.imageBrokerhood}
            PlaceholderContent={<ActivityIndicator color="#fff" />}
          />
        </View>
        <View>
          <Text style={styles.brokerhoodName}>{bkh_nombre}</Text>
          <Text style={styles.brokerhoodDescription}>
            {bkh_asunto.substr(0, 35)}...
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
        SIN INVITACIONES
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
    marginTop: -5,
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
    backgroundColor: "#E74453",
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
    backgroundColor: "#DB4437",
    right: 75,
  },
  backRightBtnCenter: {
    backgroundColor: "#0F9D58",
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
