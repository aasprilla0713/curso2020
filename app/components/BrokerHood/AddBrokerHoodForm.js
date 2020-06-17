import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Icon,
  Avatar,
  Image,
  Input,
  Button,
  ListItem,
} from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Modal from "../Modal";
import { FontAwesome } from "@expo/vector-icons";
import SRV from "../../utils/Service";
import CST from "../../utils/CustomSettings";
import { getItem } from "../../utils/Storage";
import { USER_COMUNAS, USER_CIUDADES } from "../../constants";
import SelectComunas from "./SelectComunas";
import { reloadInfo, getComunas } from "../../utils/ReloadEnv";

const WidthScreen = Dimensions.get("window").width;

export default function AddBrokerHoodForm(props) {
  const {
    toastRef,
    setIsLoading,
    navigation,
    setIsReloadBrokerhoods,
    brokerInfo,
  } = props;
  console.log(brokerInfo);
  const [imagesSelected, setImagesSelected] = useState([]);
  const [nameBrokerhood, setNameBrokerhood] = useState("");
  const [describeBrokerhood, setDescribeBrokerhood] = useState("");
  const [precioInicial, setPrecioInicial] = useState(0);
  const [precioFinal, setPrecioFinal] = useState(0);
  const [comunasBHood, setComunasBHood] = useState([]);
  const [bkhComunas, setBkhComunas] = useState("");
  const [curBroker, setCurBroker] = useState(brokerInfo);
  const [ciudades, setCiudades] = useState([
    { label: "SELECCIONE CIUDAD", value: 0 },
  ]);
  const [ciudad, setCiudad] = useState(0);
  const [comunasDisp, setComunasDisp] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationBrokerhood, setLocationBrokerhood] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        let broker_cities = await getItem(USER_CIUDADES);
        broker_cities = JSON.parse(broker_cities);
        setCiudades(broker_cities);
      } catch (error) {
        Console.log(error);
      }
      setIsLoading(false);
    })();
  }, []);

  const changeCity = async (city) => {
    //console.log(city);
    const broker_cmnas = city > 0 ? await getComunas(city) : [];
    setCiudad(city);
    setIsLoading(true);
    setComunasBHood([]);
    setBkhComunas("");
    setComunas(broker_cmnas);
    setComunasDisp(broker_cmnas);
    setIsLoading(false);
  };

  const addBrokerhood = async () => {
    if (
      !nameBrokerhood ||
      !describeBrokerhood ||
      precioInicial === 0 ||
      precioFinal === 0
    ) {
      Alert.alert("ERROR", "Todos los campos son obligatorios");
    } else if (precioInicial.parseInt > precioFinal.parseInt) {
      Alert.alert("ERROR", "Rango incorrecto de precios");
    } else if (imagesSelected.length == 0) {
      Alert.alert("ERROR", "El BrokerHood debe tener una foto");
    } else if (comunasBHood.length == 0) {
      Alert.alert("ERROR", "El BrokerHood debe tener mínimo un SECTOR");
    } else {
      setIsLoading(true);
      let val_broker = await SRV.createBrokerhood(
        curBroker.id,
        nameBrokerhood,
        describeBrokerhood,
        precioInicial,
        precioFinal,
        bkhComunas,
        imagesSelected,
        ciudad
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
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <ImageBrokerhood
        imageBrokerhood={imagesSelected[0]}
        setIsVisibleModal={setIsVisibleModal}
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        toastRef={toastRef}
      />
      <FormAdd
        setNameBrokerhood={setNameBrokerhood}
        setDescribeBrokerhood={setDescribeBrokerhood}
        setIsVisibleMap={setIsVisibleMap}
        locationBrokerhood={locationBrokerhood}
        setPrecioInicial={setPrecioInicial}
        setPrecioFinal={setPrecioFinal}
        setCiudad={setCiudad}
        ciudades={ciudades}
        comunas={comunas}
        setComunasBHood={setComunasBHood}
        comunasBHood={comunasBHood}
        changeCity={changeCity}
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
        title="Crear Brokerhood"
        onPress={addBrokerhood}
        buttonStyle={styles.btnAddBrokerhood}
      />
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

function ImageBrokerhood(props) {
  const {
    imageBrokerhood,
    imagesSelected,
    setImagesSelected,
    toastRef,
  } = props;

  const imageSelect = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermissions.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show("Acceso a la galeria denegado", 2000);
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (result.cancelled) {
        //Cancela la galeria
        toastRef.current.show("Proceso cancelado", 2000);
      } else {
        //Se define un array para agregar las imaganes que se vayan seleccionando
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  };

  return (
    <View styles={styles.viewFoto}>
      <View style={styles.selectZonas}>
        <Icon
          type="material-community"
          name="camera"
          onPress={imageSelect}
          color="#6A3E98"
          size={25}
          underlayColor="transparent"
        />
      </View>
      {imageBrokerhood ? (
        <Image
          source={{ uri: imageBrokerhood }}
          style={{ width: WidthScreen, height: 200 }}
        />
      ) : (
        <Image
          source={require("../../../assets/img/no-image.png")}
          style={{ width: WidthScreen, height: 200 }}
        />
      )}
    </View>
  );
}

function UploadImage(props) {
  const { imagesSelected, setImagesSelected, toastRef } = props;

  const imageSelect = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermissions.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show("Acceso a la galeria denegado", 2000);
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (result.cancelled) {
        //Cancela la galeria
        toastRef.current.show("Proceso cancelado", 2000);
      } else {
        //Se define un array para agregar las imaganes que se vayan seleccionando
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  };

  const removeImage = (image) => {
    const arrayImages = imagesSelected;

    Alert.alert(
      "Eliminar Imagen",
      "¿Estás seguro de eliminar la imagen?",
      [
        {
          text: "Cencelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () =>
            setImagesSelected(
              arrayImages.filter((imageUrl) => imageUrl !== image)
            ),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.viwImage}>
      {imagesSelected.length < 1 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}

      {imagesSelected.map((imageBrokerhood, index) => (
        <Avatar
          key={index}
          onPress={() => removeImage(imageBrokerhood)}
          style={styles.miniatureStyle}
          source={{ uri: imageBrokerhood }}
        />
      ))}
    </View>
  );
}

function FormAdd(props) {
  const {
    setNameBrokerhood,
    setDescribeBrokerhood,
    setIsVisibleMap,
    locationBrokerhood,
    setPrecioInicial,
    setPrecioFinal,
    setCiudad,
    ciudades,
    comunas,
    setComunasBHood,
    changeCity,
  } = props;

  return (
    <View style={styles.viewForm}>
      <RNPickerSelect
        placeholder={{
          label: "SELECCIONE CIUDAD",
          value: 0,
          color: CST.colorPrm,
        }}
        onValueChange={(value) => changeCity(value)}
        items={ciudades}
        style={pickerSelectStyles}
      />
      <Input
        placeholder="Nombre del Brokerhood"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-group-outline",
          color: "#6A3E98",
        }}
        onChange={(e) => setNameBrokerhood(e.nativeEvent.text)}
      />
      <View style={styles.viewFormMedia}>
        <View style={{ flex: 0.5 }}>
          <Input
            placeholder="$ Mínimo"
            keyboardType="number-pad"
            maxLength={12}
            containerStyle={styles.input}
            rightIcon={
              <FontAwesome name="money" size={25} color={CST.colorPrm} />
            }
            onChange={(e) => setPrecioInicial(e.nativeEvent.text)}
          />
        </View>
        <View style={{ flex: 0.5 }}>
          <Input
            placeholder="$ Máximo"
            keyboardType="number-pad"
            maxLength={12}
            containerStyle={styles.input}
            rightIcon={
              <FontAwesome name="money" size={25} color={CST.colorPrm} />
            }
            onChange={(e) => setPrecioFinal(e.nativeEvent.text)}
          />
        </View>
      </View>
      <Input
        placeholder="Descripcion o Asunto del Grupo"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setDescribeBrokerhood(e.nativeEvent.text)}
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
      activo: comuna.activo,
      id: comuna.id,
      nombre: comuna.nombre,
    };
    const resultCmna = comunasBHood;
    const listaCmna = comunasDisp;
    const comunasFltr = resultCmna.filter((cmna) => {
      return cmna.id !== comuna.id;
    });
    let lst_cmn = bkhComunas.replace(comuna.id + "|", "");
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
            AGREGAR COBERTURA
          </Text>
          <Icon
            type="material-community"
            name="google-maps"
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
          title={comuna.nombre}
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
    height: 70,
    width: 70,
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
    backgroundColor: "#66C6F1",
  },
  btnAddBrokerhood: {
    backgroundColor: CST.colorPrm,
    margin: 20,
  },
  selectZonas: {
    position: "absolute",
    bottom: -5,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 100,
    paddingTop: 6,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    marginHorizontal: 10,
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
