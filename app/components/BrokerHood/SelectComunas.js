import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button, ListItem } from "react-native-elements";
import CST from "../../utils/CustomSettings";

export default function SelectComunasForm(props) {
  const {
    setIsVisibleModal,
    setComunasBHood,
    comunasDisp,
    setComunasDisp,
    comunasBHood,
    setBkhComunas,
    bkhComunas,
  } = props;
  const [lstComunas, setLstComunas] = useState(comunasDisp);

  const handleSwitch = (comuna) => {
    const resultCmna = lstComunas;
    const listaCmna = comunasBHood;
    const comunasFltr = resultCmna.filter((cmna) => {
      return cmna.id !== comuna.id;
    });
    listaCmna.push(comuna);
    let lst_cmn = bkhComunas + comuna.id + "|";
    console.log(lst_cmn);
    setBkhComunas(lst_cmn);
    setLstComunas(comunasFltr);
    setComunasDisp(comunasFltr);
    setComunasBHood(listaCmna);
  };

  return (
    <ScrollView>
      <View>
        <Button
          title="SECTORES A CUBRIR"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnUpdate}
        />
        {lstComunas.map((comuna, index) => (
          <ListItem
            key={index}
            title={comuna.nombre}
            rightIcon={{
              type: "material-community",
              name: "google-maps",
              color: CST.colorPrm,
            }}
            bottomDivider
            onPress={() => handleSwitch(comuna)}
          />
        ))}

        <Button
          title="CERRAR"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnUpdate}
          onPress={() => setIsVisibleModal(false)}
        />
      </View>
    </ScrollView>
  );
}

function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? "#6e3b6e" : "#f9c2ff" },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  input: {
    width: "100%",
    marginTop: 20,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btnUpdate: {
    backgroundColor: CST.colorPrm,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 14,
  },
});
