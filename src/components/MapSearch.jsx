import { Box } from "@chakra-ui/react";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const MapSearch = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 31.616953, lng: () => -8.012095 },
      radius: 200 * 1000,
    },
  });
  console.log("Status : ", status);
  console.log("Data : ", data);
  return (
    <Box
      position={"absolute"}
      top={1}
      left={"50%"}
      transform={"translate(-50%)"}
      width={"50%"}
      maxW={"400px"}
      zIndex={10}
    >
      <Combobox
        onSelect={(value) => {
          console.log(value);
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder={"Search ..."}
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </Box>
  );
};

export default MapSearch;
