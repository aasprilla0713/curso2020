import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Dimensions,
  Platform,
  Slider,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Icon,
  Avatar,
  Image,
  Input,
  Button,
  Divider,
  ListItem,
} from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import Modal from "../Modal";
import {
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import SRV from "../../utils/Service";
import CST from "../../utils/CustomSettings";
import SelectComunas from "./SelectZonas";
import {
  getTiposInmueble,
  getZonasGen,
  reloadInfo,
} from "../../utils/ReloadEnv";
import { MainContext } from "../../context/MainContext";

const WidthScreen = Dimensions.get("window").width;

export default function AddOrderGenForm(props) {
  const {
    toastRef,
    setIsLoading,
    navigation,
    curBroker,
    idComuna,
    origen,
  } = props;
  console.log(props);
  const [tipoEstate, setTipoEstate] = useState(0);
  const [motivoEstate, setMotivoEstate] = useState(0);
  const [areaEstate, setAreaEstate] = useState(0);
  const [loteEstate, setLoteEstate] = useState(0);
  const [brokerhood, setBrokerhood] = useState({
    bkh_id: 0,
    brk_id: curBroker.id,
    id: 0,
  });
  const [precioInicial, setPrecioInicial] = useState(0);
  const [precioFinal, setPrecioFinal] = useState(0);
  const [precioMedio, setPrecioMedio] = useState(0);
  const [curInicial, setCurInicial] = useState(0);
  const [curFinal, setCurFinal] = useState(0);
  const [alcobasEstate, setAlcobasEstate] = useState(0);
  const [banosEstate, setBanosEstate] = useState(0);
  const [parkingEstate, setParkingEstate] = useState(0);
  const [addressEstate, setAddressEstate] = useState("");
  const [describeEstate, setDescribeEstate] = useState("");
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationEstate, setLocationEstate] = useState(null);
  const [tiposEstate, setTiposEstate] = useState([]);
  const [zonasEstate, setZonasEstate] = useState([]);
  const [comunasBHood, setComunasBHood] = useState([]);
  const [bkhComunas, setBkhComunas] = useState("");
  const [comunasDisp, setComunasDisp] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  //Renderizo las funciones para actualizar el Context
  const { setInfoBroker, setMatchesOrd } = useContext(MainContext);

  useEffect(() => {
    (async () => {
      setIsLoading(false);
      const tiposImueble = await getTiposInmueble();
      setTiposEstate(tiposImueble);
      const zonasComunas = await getZonasGen(idComuna);
      setComunas(zonasComunas);
      setComunasDisp(zonasComunas);
      setZonasEstate(zonasComunas);
    })();
    setIsLoading(false);
  }, []);

  const addPropiedad = async () => {
    if (
      motivoEstate === 0 ||
      tipoEstate === 0 ||
      areaEstate === 0 ||
      curInicial === 0 ||
      curFinal === 0 ||
      !describeEstate
    ) {
      Alert.alert(
        "Datos Incompletos",
        "Tipo de Inmueble, Motivo de Pedido, Area, Precio y Descripcion son OBLIGATORIOS"
      );
    } else if (comunasBHood.length == 0) {
      Alert.alert("ERROR", "El Pedido debe tener mínimo un SECTOR");
    } else {
      if (Number.parseFloat(curInicial) > Number.parseFloat(curFinal)) {
        Alert.alert("ERROR", "Rango de PRECIOS INCORRECTOS");
      } else {
        setIsLoading(true);
        let val_order = await SRV.createOrder(
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
        );
        console.log(val_order.type);
        if (val_order.type > 0) {
          let updInfo = await reloadInfo(val_order.datos);
          setInfoBroker(val_order.datos.broker);
          setMatchesOrd(val_order.datos.matches_ord);
          navigation.navigate(origen < 3 ? "MyBrokerHoods" : "MyAccount");
        } else {
          setIsLoading(false);
          Alert.alert("ERROR", val_order.message);
          console.log(val_order.message);
        }
      }
    }
  };

  return (
    <ScrollView>
      <FormAdd
        setTipoEstate={setTipoEstate}
        setMotivoEstate={setMotivoEstate}
        setAddressEstate={setAddressEstate}
        setDescribeEstate={setDescribeEstate}
        setIsVisibleMap={setIsVisibleMap}
        locationEstate={locationEstate}
        tiposEstate={tiposEstate}
        setAreaEstate={setAreaEstate}
        setLoteEstate={setLoteEstate}
        setPrecioInicial={setPrecioInicial}
        setPrecioFinal={setPrecioFinal}
        setAlcobasEstate={setAlcobasEstate}
        setBanosEstate={setBanosEstate}
        setParkingEstate={setParkingEstate}
        precioInicial={precioInicial}
        precioFinal={precioFinal}
        precioMedio={precioMedio}
        curInicial={curInicial}
        curFinal={curFinal}
        setCurInicial={setCurInicial}
        setCurFinal={setCurFinal}
      />
      <ShowComunas
        comunasBHood={comunasBHood}
        setIsVisibleModal={setIsVisibleModal}
        setComunasDisp={setComunasDisp}
        setComunasBHood={setComunasBHood}
        comunasDisp={comunasDisp}
        setBkhComunas={setBkhComunas}
        bkhComunas={bkhComunas}
      />
      <Button
        title="Lanzar el Pedido"
        onPress={addPropiedad}
        buttonStyle={styles.btnAddEstate}
      />
      <Divider style={styles.divider} />
      <ImageEstate />
      <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
        <SelectComunas
          setIsVisibleModal={setIsVisibleModal}
          setComunasBHood={setComunasBHood}
          comunasDisp={comunasDisp}
          setComunasDisp={setComunasDisp}
          comunasBHood={comunasBHood}
          setBkhComunas={setBkhComunas}
          bkhComunas={bkhComunas}
        />
      </Modal>
    </ScrollView>
  );
}

function ImageEstate(props) {
  return (
    <View styles={styles.viewFoto}>
      <Image
        source={require("../../../assets/img/order.png")}
        style={{ width: WidthScreen, height: 300 }}
      />
    </View>
  );
}

function ShowComunas(props) {
  const {
    comunasBHood,
    setIsVisibleModal,
    setComunasDisp,
    setComunasBHood,
    comunasDisp,
    setBkhComunas,
    bkhComunas,
  } = props;
  const handleComuna = (comuna) => {
    const cur_cmna = {
      bkh_id: comuna.bkh_id,
      cmn_id: comuna.cmn_id,
      label: comuna.label,
      value: comuna.value,
    };
    const resultCmna = comunasBHood;
    const listaCmna = comunasDisp;
    const comunasFltr = resultCmna.filter((cmna) => {
      return cmna.value !== comuna.value;
    });
    let lst_cmn = bkhComunas.replace(comuna.ivalue + "|", "");
    setBkhComunas(lst_cmn);
    setComunasBHood(comunasFltr);
    listaCmna.push(cur_cmna);
    setComunasDisp(listaCmna);
    //console.log(comunasDisp);
  };

  return (
    <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={[styles.backLeftBtn, styles.backLeftBtnLeft]}
          onPress={() => setIsVisibleModal(true)}
        >
          <Text style={{ color: CST.colorPrm, fontSize: 16 }}>
            ELEGIR SECTOR(ES)
          </Text>
          <Icon
            type="material-community"
            name="map-marker-plus"
            onPress={() => setIsVisibleModal(true)}
            color="#6A3E98"
            size={25}
            underlayColor="transparent"
          />
        </TouchableOpacity>
      </View>
      {comunasBHood.map((comuna, index) => (
        <ListItem
          key={index}
          title={comuna.label}
          rightIcon={{
            type: "material-community",
            name: "google-maps",
            color: CST.colorPrm,
          }}
          bottomDivider
          onPress={() => handleComuna(comuna)}
        />
      ))}
    </View>
  );
}

function FormAdd(props) {
  const {
    setTipoEstate,
    setMotivoEstate,
    setAddressEstate,
    setDescribeEstate,
    setIsVisibleMap,
    locationEstate,
    tiposEstate,
    setAreaEstate,
    setLoteEstate,
    setPrecioInicial,
    setPrecioFinal,
    setAlcobasEstate,
    setBanosEstate,
    setParkingEstate,
    precioInicial,
    precioFinal,
    precioMedio,
    curInicial,
    curFinal,
    setCurInicial,
    setCurFinal,
  } = props;
  return (
    <View style={styles.viewForm}>
      <RNPickerSelect
        placeholder={{
          label: "Tipo de Inmueble",
          value: 0,
          color: CST.colorPrm,
        }}
        onValueChange={(value) => setTipoEstate(value)}
        items={tiposEstate}
        style={pickerSelectStyles}
      />
      <RNPickerSelect
        placeholder={{
          label: "Tipo de Solicitud",
          value: 0,
          color: CST.colorPrm,
        }}
        onValueChange={(value) => setMotivoEstate(value)}
        items={[
          { label: "COMPRA", value: 1 },
          { label: "ALQUILER", value: 2 },
          { label: "PERMUTA", value: 3 },
          { label: "TODOS", value: 4 },
        ]}
        style={pickerSelectStyles}
      />
      <Input
        placeholder="Sector - Unidad - Edificio"
        containerStyle={[
          styles.input,
          { marginTop: Platform.OS === "ios" ? 15 : 0 },
        ]}
        rightIcon={{
          type: "material-community",
          name: "map-marker",
          color: locationEstate ? "#00a680" : "#c2c2c2",
        }}
        onChange={(e) => setAddressEstate(e.nativeEvent.text)}
      />
      <View style={styles.viewFormMedia}>
        <View style={{ flex: 0.5 }}>
          <Input
            placeholder="Area m2"
            keyboardType="numeric"
            maxLength={8}
            containerStyle={styles.input}
            rightIcon={
              <MaterialCommunityIcons
                name="floor-plan"
                size={25}
                color={CST.colorPrm}
              />
            }
            onChange={(e) => setAreaEstate(e.nativeEvent.text)}
          />
        </View>
        <View style={{ flex: 0.5 }}>
          <Input
            placeholder="Lote m2"
            keyboardType="numeric"
            maxLength={8}
            containerStyle={styles.input}
            rightIcon={<FontAwesome name="map-o" size={25} color={"#c2c2c2"} />}
            onChange={(e) => setLoteEstate(e.nativeEvent.text)}
          />
        </View>
      </View>
      <View style={styles.viewFormMedia}>
        <View style={{ flex: 0.3 }}>
          <Input
            placeholder="Habit."
            keyboardType="numeric"
            maxLength={3}
            containerStyle={styles.input}
            rightIcon={<FontAwesome name="bed" size={25} color={"#c2c2c2"} />}
            onChange={(e) => setAlcobasEstate(e.nativeEvent.text)}
          />
        </View>
        <View style={{ flex: 0.3 }}>
          <Input
            placeholder="Baños"
            maxLength={2}
            keyboardType="numeric"
            containerStyle={styles.input}
            rightIcon={
              <MaterialCommunityIcons
                name="toilet"
                size={25}
                color={"#c2c2c2"}
              />
            }
            onChange={(e) => setBanosEstate(e.nativeEvent.text)}
          />
        </View>
        <View style={{ flex: 0.3 }}>
          <Input
            placeholder="Parking"
            keyboardType="numeric"
            maxLength={2}
            containerStyle={styles.input}
            rightIcon={<AntDesign name="car" size={25} color={"#c2c2c2"} />}
            onChange={(e) => setParkingEstate(e.nativeEvent.text)}
          />
        </View>
      </View>
      <View style={styles.viewFormMedia}>
        <View style={{ flex: 0.5 }}>
          <Input
            placeholder="Precio Desde"
            keyboardType="numeric"
            maxLength={8}
            containerStyle={styles.input}
            rightIcon={
              <FontAwesome name="money" size={25} color={CST.colorPrm} />
            }
            onChange={(e) => setCurInicial(e.nativeEvent.text)}
          />
        </View>
        <View style={{ flex: 0.5 }}>
          <Input
            placeholder="Precio Hasta"
            keyboardType="numeric"
            maxLength={8}
            containerStyle={styles.input}
            rightIcon={
              <FontAwesome name="money" size={25} color={CST.colorPrm} />
            }
            onChange={(e) => setCurFinal(e.nativeEvent.text)}
          />
        </View>
      </View>
      <Input
        placeholder="Descripcion de la Propiedad"
        multiline={true}
        inputContainerStyle={styles.textArea}
        rightIcon={
          <MaterialCommunityIcons
            name="comment-account-outline"
            size={30}
            color={CST.colorPrm}
          />
        }
        onChange={(e) => setDescribeEstate(e.nativeEvent.text)}
      />
    </View>
  );
}

function ShowPrecio(props) {
  const { setPrecioInicial } = props;
  return (
    <Slider
      style={{ width: 200, height: 40 }}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
    />
  );
}

const styles = StyleSheet.create({
  viewFoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
  viwImage: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    marginRight: 10,
    height: 66,
    width: 66,
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
  },
  viewFormMedia: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  mapStyle: {
    width: "100%",
    height: 450,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnSave: {
    backgroundColor: CST.colorPrm,
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5,
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d",
  },
  btnAddEstate: {
    backgroundColor: CST.colorPrm,
    margin: 20,
  },
  divider: {
    backgroundColor: CST.colorPrm,
    margin: 10,
    marginBottom: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    marginHorizontal: 10,
    //marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: CST.colorPrm,
    borderRadius: 4,
    color: CST.colorPrm,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: CST.colorPrm,
    borderRadius: 8,
    color: CST.colorPrm,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
