import { Flex } from "@chakra-ui/react";
import React from "react";
// import { useLoadScript } from "@react-google-maps/api";
import Map from "../../../components/Map";
/// API_KEY = "AIzaSyBsuSl3wvIFK4xuVaepme17IXAQgSRML94"

const MyCoordinates = () => {
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  //   libraries: ["places"],
  // });

  return (
    <Flex flex={1}>
      <Map />
    </Flex>
  );
};

export default MyCoordinates;
