import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import CST from "../../utils/CustomSettings";

const heightScreen = Dimensions.get("window").height;

export default function UserGuest() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.viewBody}>
      <View>
        <View>
          <Image
            source={require("../../../assets/img/user-guest.png")}
            style={styles.image}
            resize="container"
          />
          <View style={{ marginTop: heightScreen * 0.67 }}>
            <Text style={styles.title}>
              OPTIMIZA - PERSONALIZA - INCREMENTA
            </Text>
            <Text style={styles.description}>
              TU TIEMPO - TUS ANUNCIOS - TUS RESULTADOS
            </Text>
          </View>
        </View>

        <View style={styles.viewBtn}>
          <Button
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
            title="Continuar"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },
  image: {
    height: heightScreen * 0.65,
    width: "100%",
    marginBottom: 10,
    position: "absolute",
    top: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 12,
    fontStyle: "italic",
  },
  viewBtn: {
    alignItems: "center",
    marginTop: 20,
  },
  btnStyle: {
    backgroundColor: CST.colorPrm,
  },
  btnContainer: {
    width: "95%",
  },
});
