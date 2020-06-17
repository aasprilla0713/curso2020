import { AsyncStorage } from "react-native";
//import { AsyncStorage } from "@react-native-community/async-storage";

export const saveItem = async (KeyName, KeyValue) => {
  try {
    await AsyncStorage.setItem(KeyName, KeyValue);
    return true;
  } catch (e) {
    return false;
  }
};

export const updateItem = async (KeyName, KeyValue) => {
  try {
    await AsyncStorage.mergeItem(KeyName, KeyValue);
    return true;
  } catch (e) {
    return false;
  }
};

export const getItem = async (KeyName) => {
  try {
    return await AsyncStorage.getItem(KeyName);
  } catch (e) {
    return false;
  }
};

export const validItem = async (KeyName) => {
  try {
    return await AsyncStorage.getItem(KeyName);
    //return true;
  } catch (e) {
    return false;
  }
};

export const deleteItem = async (KeyName) => {
  try {
    await AsyncStorage.removeItem(KeyName);
    return true;
  } catch (e) {
    return false;
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    return false;
  }
};
