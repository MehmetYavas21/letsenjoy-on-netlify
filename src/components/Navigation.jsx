import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Flex
      bg="blackAlpha.700"
      color="whiteAlpha.700"
      p={4}
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading
        as="h1"
        size="lg"
        color="whatsapp.100"
        background="green.800"
        p="15px"
        borderRadius="50px"
        fontFamily="fantasy"
        _hover={{
          size: "xl",
          transition: "bg",
          bg: "green.200",
          color: "white",
          textDecoration: "none",
        }}
      >
        <Link to="/"> EnJoY</Link>
      </Heading>
      <Flex _hover={{ transition: "bg", bg: "blackAlpha.300" }}>
        <Link to="/">Home</Link>
        <Link to="/event/1">Event</Link>
        <Link to="/user/1">User</Link>
        <Link to="/event/new">Add</Link>
      </Flex>
    </Flex>
  );
};
