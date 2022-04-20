import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  Button,
  AlertDialogFooter,
  Flex,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRef, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toErrorMap } from "../utils/toErrorMap";

import InputField from "./InputField";

export const AuthPopup = ({
  fontColor,
  loggedIn,
  text,
  fn,
}: {
  loggedIn: boolean;
  text: string;
  fontColor?: string;
  fn?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const cancelRef = useRef();

  const { loginF } = useAuthContext();
  return (
    <>
      <Button
        _focus={{ outlineColor: "transparent" }}
        bgColor={fontColor}
        onClick={async () => {
          if (!loggedIn) {
            setIsOpen(true);
          } else {
            fn();
          }
        }}
      >
        {text}
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => {
          setIsOpen(false);
        }}
        isCentered
      >
        <AlertDialogOverlay color={"black"}>
          <AlertDialogContent backgroundColor={"white"}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Connection
            </AlertDialogHeader>

            <AlertDialogBody>
              <Formik
                initialValues={{ login: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                  const res = await loginF({
                    l: values.login,
                    p: values.password,
                  });

                  if (res.errors) {
                    setErrors(toErrorMap(res.errors));
                  } else if (res.user) {
                    setIsOpen(false);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <InputField
                      name="login"
                      placeholder="Email or Username"
                      label="Email or Username"
                    />
                    <InputField
                      name="password"
                      placeholder="Password"
                      label="Password"
                      type="password"
                    />
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
                        Login
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        ml={3}
                      >
                        Cancel
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </AlertDialogBody>

            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
