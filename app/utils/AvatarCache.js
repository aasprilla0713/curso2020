import React, { useState, useEffect } from "react";
import { Avatar } from "react-native-elements";
import shorthash from "shorthash";
import * as FileSystem from "expo-file-system";

export default function CacheAvatar(props) {
  const { uri, style, size, PlaceholderContent } = props;
  const [source, setSource] = useState({});

  useEffect(() => {
    (async () => {
      const name = shorthash.unique(uri);
      const path = `${FileSystem.cacheDirectory}${name}`;
      const image = await FileSystem.getInfoAsync(path);
      if (image.exists) {
        console.log("read image from cache");
        setSource({ uri: image.uri });
        return;
      }

      const newImage = await FileSystem.downloadAsync(uri, path);
      setSource({ uri: newImage.uri });
    })();
  }, []);

  return (
    <Avatar
      style={style}
      source={source}
      rounded
      size={size}
      PlaceholderContent={PlaceholderContent}
    />
  );
}
