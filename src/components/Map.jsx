import React, { useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import MapSearch from "./MapSearch";
import mapStyles from "../mapStyles";
import { Form, Formik } from "formik";
import InputField from "./InputField";
import { useCreateCoordinates } from "../hooks/useCreateCoordinates";
import { useGetMyCoordinates } from "../hooks/useGetMyCoordinates";
import { toErrorMap } from "../utils/toErrorMap";
import useDeleteCoordinates from "../hooks/useDeleteCoordinates";
import { CreateCoords } from "./CreateCoords";

const options = {
  style: mapStyles,
};

const containerStyle = {
  width: "400px",
  height: "600px",
};

const center = { lat: 31.616953, lng: -8.012095 };
const libraries = ["places"];
const Map = () => {
  const { getCoordinates, coordinates, setcoordinates, loading, refetch } =
    useGetMyCoordinates();
  const [selected, setSelected] = useState(null);
  const [createMode, setCreateMode] = useState(false);
  const { createCoordinates, loading: loadingCr } = useCreateCoordinates();
  const { deleteCoordinates, loading: loadingDel } = useDeleteCoordinates();

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = useRef();
  const [marker, setMarker] = useState({});
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // const onUnmount = useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

  const onMapClick = useCallback(
    (e) => {
      if (createMode) {
        setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      }
    },
    [createMode]
  );

  return isLoaded ? (
    <Flex w={"100%"} flexDirection={"row"}>
      <Box position={"relative"}>
        <MapSearch />

        <Box>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={onLoad}
            // onUnmount={onUnmount}
            onClick={onMapClick}
            // options={options}
            zIndex={1}
          >
            <>
              {coordinates?.map((c) => {
                return (
                  <Marker
                    position={c.gps}
                    onClick={() => {
                      setSelected(c);
                    }}
                  />
                );
              })}
              {marker && (
                <Marker
                  position={marker}
                  icon={{
                    url: "/green_pin.png",
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0, 0),
                  }}
                />
              )}
              {selected ? (
                <InfoWindow
                  position={{ lat: selected.gps.lat, lng: selected.gps.lng }}
                  onCloseClick={() => {
                    setSelected(null);
                  }}
                >
                  <Flex flexDirection={"column"}>
                    <Text>
                      {" "}
                      GPS: {selected.gps.lat.toFixed(4)} |{" "}
                      {selected.gps.lng.toFixed(4)}
                    </Text>
                    <Text> Tag: {selected?.tags?.map((tag) => `${tag},`)}</Text>
                    <Text> Socials: {selected.socials[0].url}</Text>
                    <Button
                      onClick={async () => {
                        const res = await deleteCoordinates(selected.id);
                        console.log("res ", res);
                        if (res.message === "Deleted succesfully") {
                          refetch();
                          setSelected(null);
                        }
                      }}
                    >
                      {" "}
                      Delete
                    </Button>
                  </Flex>
                </InfoWindow>
              ) : null}
            </>
          </GoogleMap>
        </Box>
      </Box>
      <CreateCoords
        createCoordinates={createCoordinates}
        createMode={createMode}
        marker={marker}
        refetch={refetch}
        setCreateMode={setCreateMode}
        setMarker={setMarker}
      />
    </Flex>
  ) : (
    <></>
  );
};

export default React.memo(Map);
