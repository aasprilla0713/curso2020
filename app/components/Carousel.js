import React from "react";
import { Image } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import CacheImage from "../utils/CacheImages";

export default function CarouselImages(props) {
  const { arrayImages, height, width } = props;
  console.log(arrayImages);

  const renderItem = ({ item }) => {
    console.log(item);
    return <CacheImage style={{ width, height }} uri={item} />;
  };

  return (
    <Carousel
      layout={"stack"}
      layoutCardOffset={20}
      data={arrayImages}
      sliderWidth={width}
      itemWidth={width}
      renderItem={renderItem}
    />
  );
}
