import {
  Box,
  Button,
  Checkbox,
  Flex,
  Link,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useAuthContext } from "../context/AuthContext";
import { useRegister } from "../hooks/useRegister";
import { toErrorMap } from "../utils/toErrorMap";

const Register = () => {
  const { register, loading } = useRegister();
  const { isAuth, loading: loadingCtx, loginF } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth && !loadingCtx) {
      navigate({ pathname: "/" });
    }
  }, [loadingCtx, isAuth]);
  return (
    <Flex py={"16"} justifyContent={"center"} alignItems={"center"}>
      <Tabs rounded={"lg"} shadow={"2xl"} w={"500"} bgColor={"betaWhite"}>
        <TabList
          roundedTop={"lg"}
          alignItems={"center"}
          justifyContent={"center"}
          p={6}
          bgColor={"alphaWhite"}
        >
          <Flex w={"80%"} flexDirection={"row"} justify={"space-between"}>
            <Tab fontWeight={"semibold"} fontSize={"2xl"}>
              S'inscrire
            </Tab>
            <Tab fontWeight={"semibold"} fontSize={"2xl"}>
              Se connecter
            </Tab>
          </Flex>
        </TabList>
        <TabPanels minW={"500"}>
          <TabPanel>
            <Flex p={8}>
              <Formik
                initialValues={{
                  firstname: "",
                  lastname: "",
                  username: "",
                  email: "",
                  password: "",
                  confirmedPassword: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const res = await register(values);

                  if (res.errors) {
                    setErrors(toErrorMap(res.errors));
                  } else {
                    await loginF({
                      l: values.username,
                      p: values.password,
                    });
                    navigate({ pathname: "/dashboard" });
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Flex flexDirection={"column"}>
                      <Box>
                        <InputField
                          space_between
                          flex
                          name="firstname"
                          placeholder="Firstname"
                          label="Firstname"
                        />
                      </Box>
                      <Box mt={4}>
                        <InputField
                          space_between
                          flex
                          name="lastname"
                          placeholder="Lastname"
                          label="Lastname"
                        />
                      </Box>
                      <Box mt={4}>
                        <InputField
                          space_between
                          flex
                          name="username"
                          placeholder="Username"
                          label="Username"
                        />
                      </Box>

                      <Box mt={4}>
                        <InputField
                          space_between
                          flex
                          name="email"
                          placeholder="Email"
                          label="Email"
                        />
                      </Box>

                      <Box mt={4}>
                        <InputField
                          space_between
                          flex
                          name="password"
                          placeholder="Password"
                          label="Password"
                          type="password"
                        />
                      </Box>

                      <Box mt={4}>
                        <InputField
                          space_between
                          flex
                          name="confirmedPassword"
                          placeholder="Confirmer Password"
                          label="Confirmer Password"
                          type="password"
                        />
                      </Box>
                    </Flex>

                    <Stack mt={6} spacing={6}>
                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                      >
                        <Checkbox>
                          <Box color={"blue.500"} as={Link}>
                            I read and agree to termes of service
                          </Box>
                        </Checkbox>
                      </Stack>
                      <Stack>
                        <Button
                          isLoading={isSubmitting}
                          type={"submit"}
                          mx={"auto"}
                          w={"50%"}
                          color={"white"}
                          bgColor={"#205d91"}
                          _hover={{ bgColor: "blue.800" }}
                          variant={"solid"}
                        >
                          Sign Up
                        </Button>
                      </Stack>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex p={8}>
              <Formik
                initialValues={{ login: "", password: "" }}
                onSubmit={() => {}}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Flex minW={"400"} w={"100%"} flexDirection={"column"}>
                      <Box w={"full"} mt={4}>
                        <InputField
                          space_between
                          flex
                          name="login"
                          placeholder="Email or username"
                          label="Email or username"
                        />
                      </Box>

                      <Box mt={4}>
                        <InputField
                          space_between
                          flex
                          name="password"
                          placeholder="Password"
                          label="Password"
                          type="password"
                        />
                      </Box>
                    </Flex>

                    <Stack mt={6} spacing={6}>
                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                      >
                        <Checkbox>Remember me</Checkbox>
                        <Link
                          // onClick={() => {
                          //   router.push({
                          //     pathname: "user/forgot_password",
                          //   });
                          // }}
                          color={"blue.500"}
                        >
                          Forgot password?
                        </Link>
                      </Stack>
                      <Stack>
                        <Button
                          isLoading={isSubmitting}
                          type={"submit"}
                          mx={"auto"}
                          w={"50%"}
                          color={"white"}
                          bgColor={"alphaBlue"}
                          _hover={{ bgColor: "blue.800" }}
                          variant={"solid"}
                        >
                          Sign In
                        </Button>
                      </Stack>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Register;
