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
} from "react-native";
import {
  Icon,
  Avatar,
  Image,
  Input,
  Button,
  Divider,
} from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import Modal from "../Modal";
import {
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import SRV from "../../utils/Service";
import CST from "../../utils/CustomSettings";
import { getTiposInmueble, getZonas, reloadInfo } from "../../utils/ReloadEnv";
import { MainContext } from "../../context/MainContext";

const WidthScreen = Dimensions.get("window").width;

export default function AddOfferForm(props) {
  const { toastRef, setIsLoading, navigation, brokerhood } = props;
  const [imagesSelected, setImagesSelected] = useState([]);
  const [tipoEstate, setTipoEstate] = useState(0);
  const [zonaEstate, setZonaEstate] = useState(0);
  const [motivoEstate, setMotivoEstate] = useState(0);
  const [areaEstate, setAreaEstate] = useState(0);
  const [loteEstate, setLoteEstate] = useState(0);
  const [idEstate, setIdEstate] = useState(brokerhood.bkh_id);
  const [precioEstate, setPrecioEstate] = useState(brokerhood.bkh_minimo);
  const [alcobasEstate, setAlcobasEstate] = useState(0);
  const [banosEstate, setBanosEstate] = useState(0);
  const [parkingEstate, setParkingEstate] = useState(0);
  const [nameEstate, setNameEstate] = useState("NO APLICA");
  const [addressEstate, setAddressEstate] = useState("");
  const [describeEstate, setDescribeEstate] = useState("");
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationEstate, setLocationEstate] = useState(null);
  const [latitudEstate, setLatitudEstate] = useState(null);
  const [longitudEstate, setLongitudEstate] = useState(null);
  const [latitudDeltaEstate, setLatitudDeltaEstate] = useState(null);
  const [longitudDeltaEstate, setLongitudDeltaEstate] = useState(null);
  const [tiposEstate, setTiposEstate] = useState([]);
  const [zonasEstate, setZonasEstate] = useState([]);
  const [precioInicial, setPrecioInicial] = useState(brokerhood.bkh_minimo);
  const [precioFinal, setPrecioFinal] = useState(brokerhood.bkh_maximo);

  //Renderizo las funciones para actualizar el Context
  const { setInfoBroker, setMatchesOfr } = useContext(MainContext);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const tiposImueble = await getTiposInmueble();
      setTiposEstate(tiposImueble);
      const zonasComunas = await getZonas(idEstate);
      setZonasEstate(zonasComunas);
    })();
    setIsLoading(false);
  }, []);

  const addPropiedad = async () => {
    if (
      motivoEstate === 0 ||
      tipoEstate === 0 ||
      zonaEstate === 0 ||
      areaEstate === 0 ||
      precioEstate === 0 ||
      !describeEstate
    ) {
      Alert.alert(
        "Datos Incompletos",
        "Tipo de Inmueble, Motivo de Oferta, Area, Precio y Descripcion son OBLIGATORIOS"
      );
    } else if (imagesSelected.length == 0) {
      Alert.alert("Cargar Oferta", "La propiedad debe tener minimo una foto");
    } else {
      setIsLoading(true);
      console.log(imagesSelected[1]);

      //Se suben las imagenes
      let val_offer = await SRV.createOffer(
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
      );
      if (val_offer.type > 0) {
        toastRef.current.show("OFERTA CREADA CON EXITO", 2000);
        let updInfo = await reloadInfo(val_offer.datos);
        setInfoBroker(val_offer.datos.broker);
        setMatchesOfr(val_offer.datos.matches_ofr);
        navigation.navigate("MyBrokerHoods");
      } else {
        setIsLoading(false);
        Alert.alert("ERROR", val_offer.message);
      }
    }
  };

  //Funcion para subir imagenes al storage de firebase
  const uploadImageStorage = async (imageArray) => {
    const imagesBlob = [];
    await Promise.all(
      imageArray.map(async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase.storage().ref("estates-images").child(uuid());
        await ref.put(blob).then((result) => {
          imagesBlob.push(result.metadata.name);
        });
      })
    );
    return imagesBlob;
  };

  return (
    <ScrollView>
      <FormAdd
        setTipoEstate={setTipoEstate}
        setMotivoEstate={setMotivoEstate}
        setNameEstate={setNameEstate}
        setAddressEstate={setAddressEstate}
        setDescribeEstate={setDescribeEstate}
        setIsVisibleMap={setIsVisibleMap}
        locationEstate={locationEstate}
        tiposEstate={tiposEstate}
        setAreaEstate={setAreaEstate}
        setLoteEstate={setLoteEstate}
        setPrecioEstate={setPrecioEstate}
        setAlcobasEstate={setAlcobasEstate}
        setBanosEstate={setBanosEstate}
        setParkingEstate={setParkingEstate}
        precioFinal={precioFinal}
        precioInicial={precioInicial}
        precioEstate={precioEstate}
        zonasEstate={zonasEstate}
        setZonaEstate={setZonaEstate}
      />
      <UploadImage
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        toastRef={toastRef}
      />
      <Button
        title="Lanzar la Oferta"
        onPress={addPropiedad}
        buttonStyle={styles.btnAddEstate}
      />
      <Divider style={styles.divider} />
      <ImageEstate imageEstate={imagesSelected[0]} />

      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationEstate={setLocationEstate}
        toastRef={toastRef}
        setLatitudEstate={setLatitudEstate}
        setLongitudEstate={setLongitudEstate}
        setLatitudDeltaEstate={setLatitudDeltaEstate}
        setLongitudDeltaEstate={setLongitudDeltaEstate}
      />
    </ScrollView>
  );
}

function ImageEstate(props) {
  const { imageEstate } = props;

  return (
    <View styles={styles.viewFoto}>
      {imageEstate ? (
        <Image
          source={{ uri: imageEstate }}
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
      });

      if (result.cancelled) {
        //Cancela la galeria
        toastRef.current.show("Proceso cancelado", 2000);
      } else {
        //Se define un array para agregar las imaganes que se vayan seleccionando
        /*if (Platform.OS === "ios") {
          let image = result.uri;
          let image_new = image.replace("file://", "assets://");
          setImagesSelected([...imagesSelected, image_new]);
        } else {*/
        //alert(result.uri);
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
      {imagesSelected.length < 5 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}

      {imagesSelected.map((imageEstate, index) => (
        <Avatar
          key={index}
          onPress={() => removeImage(imageEstate)}
          style={styles.miniatureStyle}
          source={{ uri: imageEstate }}
        />
      ))}
    </View>
  );
}

function FormAdd(props) {
  const {
    setTipoEstate,
    setMotivoEstate,
    setNameEstate,
    setAddressEstate,
    setDescribeEstate,
    setIsVisibleMap,
    locationEstate,
    tiposEstate,
    setAreaEstate,
    setLoteEstate,
    setPrecioEstate,
    setAlcobasEstate,
    setBanosEstate,
    setParkingEstate,
    precioFinal,
    precioInicial,
    precioEstate,
    zonasEstate,
    setZonaEstate,
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
          label: "Motivo de la Oferta",
          value: 0,
          color: CST.colorPrm,
        }}
        onValueChange={(value) => setMotivoEstate(value)}
        items={[
          { label: "VENTA", value: 1 },
          { label: "ALQUILER", value: 2 },
          { label: "PERMUTA", value: 3 },
          { label: "TODOS", value: 4 },
        ]}
        style={pickerSelectStyles}
      />
      <RNPickerSelect
        placeholder={{
          label: "Barrio o Zona",
          value: 0,
          color: CST.colorPrm,
        }}
        onValueChange={(value) => setZonaEstate(value)}
        items={zonasEstate}
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
          name: "google-maps",
          color: locationEstate ? "#00a680" : "#c2c2c2",
          onPress: () => setIsVisibleMap(true),
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
            placeholder="Alcobas"
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
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 15,
          marginBottom: -10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: CST.colorPrm }}>Precio</Text>
      </View>
      <Slider
        style={{
          height: 40,
          marginTop: 5,
          marginBottom: 10,
          marginHorizontal: 10,
          thumbTintColor: CST.colorPrm,
        }}
        minimumValue={precioInicial}
        maximumValue={precioFinal}
        step={10}
        value={precioInicial}
        onValueChange={(value) => setPrecioEstate(value)}
        minimumTrackTintColor={CST.colorPrm}
        maximumTrackTintColor={CST.colorSec}
      />
      <View
        style={{
          marginHorizontal: 15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>$ {precioInicial} M</Text>
        <Text style={{ color: CST.colorPrm, fontWeight: "bold" }}>
          {precioEstate}
        </Text>
        <Text>$ {precioFinal} M</Text>
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

function Map(props) {
  const {
    isVisibleMap,
    setIsVisibleMap,
    setLocationEstate,
    toastRef,
    setLatitudEstate,
    setLongitudEstate,
    setLatitudDeltaEstate,
    setLongitudDeltaEstate,
  } = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const resultPermissions = await Permissions.askAsync(
        Permissions.LOCATION
      );
      const statusPermissions = resultPermissions.permissions.location.status;

      if (statusPermissions !== "granted") {
        toastRef.current.show(
          "Debe aceptar los permisos de GEOLOCALIZACION",
          2000
        );
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationEstate(location);
    setLatitudEstate(location.latitude);
    setLatitudDeltaEstate(location.latitudeDelta);
    setLongitudEstate(location.longitude);
    setLongitudDeltaEstate(location.longitudeDelta);
    toastRef.current.show("Localizacion Guardada", 2000);
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar Ubicacion"
            onPress={confirmLocation}
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
          />
          <Button
            title="Cancelar Ubicacion"
            onPress={() => setIsVisibleMap(false)}
            containerStyle={styles.viewMapBtnContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
          />
        </View>
      </View>
    </Modal>
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
