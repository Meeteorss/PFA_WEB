import {
  Flex,
  Tag,
  TagLabel,
  TagRightIcon,
  Input,
  Text,
  InputGroup,
} from "@chakra-ui/react";
import { GrFormClose } from "react-icons/gr";

export const TagInput = ({ tags, setTags, tag, setTag }) => {
  return (
    <Flex alignItems={"center"} flexDirection={"row"}>
      <Text mr={8} fontWeight={"semibold"} as={"label"}>
        Tags:
      </Text>

      <Flex flexDirection={"column"}>
        <Flex flexDirection={"row"}>
          {tags?.map((t) => (
            <Tag bgColor={""}>
              <TagLabel>{t}</TagLabel>
              <TagRightIcon
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  setTags((prev) => prev.filter((e) => e !== t));
                }}
                boxSize="16px"
                as={GrFormClose}
              />
            </Tag>
          ))}
        </Flex>
        <Input
          style={{
            resize: "none",
            borderColor: "gray",
          }}
          bgColor={"white"}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (tags.length < 3 && tag !== "") {
                setTags((curr) => [...curr, tag]);
                setTag("");
              }
            }
          }}
        />
      </Flex>
    </Flex>
  );
};
