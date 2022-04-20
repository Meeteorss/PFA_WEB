import {
  Flex,
  Button,
  Text,
  Input,
  Tag,
  TagRightIcon,
  TagLabel,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useState } from "react";
import { toErrorMap } from "../utils/toErrorMap";
import InputField from "./InputField";
import { GrFormClose } from "react-icons/gr";
import { TagInput } from "./TagInput";

export const CreateCoords = ({
  setCreateMode,
  createMode,
  marker,
  createCoordinates,
  refetch,
  setMarker,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  return (
    <Flex w={"100%"} flexDirection={"column"}>
      <Button
        colorScheme={"blackAlpha"}
        onClick={() => {
          setCreateMode(true);
        }}
      >
        Create new Coordinates
      </Button>
      {createMode && (
        <Flex p={4} w={"100%"}>
          <Formik
            initialValues={{
              lat: marker?.lat ? marker?.lat : null,
              lng: marker?.lng ? marker?.lng : null,
              city: "",
              country: "",
              district: "",
              street: "",
              tags: "",
              socialsUrl: "",
              socialsPlat: "",
            }}
            onSubmit={async (values, { setErrors, resetForm }) => {
              const res = await createCoordinates({
                gps: { lat: marker.lat, lng: marker.lng },
                adress: {
                  city: values.city,
                  country: values.country,
                  district: values.district,
                  street: values.street,
                },
                socials: [
                  { url: values.socialsUrl, plateform: values.socialsPlat },
                ],
                tags: tags,
              });
              if (res.coordinates) {
                // setcoordinates((prev) => [...prev, res.coordinates]);
                await refetch();
                setMarker(null);
                resetForm();
              } else if (res.errors) {
                setErrors(toErrorMap(res.errors));
              }
              console.log("response : ", res);
            }}
          >
            {({ isSubmitting }) => (
              <Form
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              >
                <Flex flexDirection={"row"} alignItems={"center"}>
                  <InputField
                    flex
                    name="lat"
                    placeholder="Latitude"
                    label="Latitude"
                    value={marker?.lat ? marker?.lat : null}
                  />
                  <InputField
                    flex
                    name="lng"
                    placeholder="Longitude"
                    label="Longitude"
                    value={marker?.lng ? marker?.lng : null}
                  />
                </Flex>
                <Flex flexDirection={"row"} alignItems={"center"}>
                  <Text mr={4} fontWeight={"semibold"}>
                    Adress:
                  </Text>
                  <Flex flexDirection={"column"}>
                    <Flex flexDirection={"row"}>
                      <InputField name="city" placeholder="City" label="City" />
                      <InputField
                        name="country"
                        placeholder="country"
                        label="Country"
                      />
                    </Flex>
                    <Flex flexDirection={"row"}>
                      <InputField
                        name="district"
                        placeholder="District"
                        label="District"
                      />
                      <InputField
                        name="street"
                        placeholder="Street"
                        label="Street"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                {/* <InputField name="tags" placeholder="Tag" label="Tag" /> */}
                <TagInput
                  tag={tag}
                  setTag={setTag}
                  tags={tags}
                  setTags={setTags}
                />
                <Flex alignItems={"center"} flexDirection={"row"}>
                  <Text mr={4} fontWeight={"semibold"}>
                    Socials:
                  </Text>
                  <Flex flexDirection={"column"}>
                    <InputField
                      name="socialsUrl"
                      placeholder="Url"
                      label="Url"
                    />
                    <InputField
                      name="socialsPlat"
                      placeholder="Plateform"
                      label="Plateform"
                    />
                  </Flex>
                </Flex>

                <Flex
                  mt={"6"}
                  mx={"auto"}
                  w={"80%"}
                  justifyContent={"space-between"}
                >
                  <Button
                    type={"submit"}
                    bgColor={"#4f4f4f"}
                    color={"white"}
                    _hover={{
                      bgColor: "#404040",
                    }}
                  >
                    Create
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      setCreateMode(false);
                      setMarker(null);
                    }}
                    ml={3}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Flex>
      )}
    </Flex>
  );
};
