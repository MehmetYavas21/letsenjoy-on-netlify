import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Flex
      bg="blue.700"
      color="#fff"
      p={4}
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading
        as="h1"
        size="lg"
        color="blue.400"
        p="15px"
        fontFamily="fantasy, sans-serif"
        textDecoration="none"
        _hover={{
          size: "xl",
          bg: "blue.100",
          color: "white",
          textDecoration: "none",
          transition: "all, .5s, ease",
        }}
      >
        <Link to="/"> EnJoY</Link>
      </Heading>
      <Flex align="baseline" justify="space-between">
        <Text
          _hover={{ transition: "background-color", background: "gray.800" }}
        >
          <Link to="/">Home</Link>
        </Text>
        <Text
          _hover={{ transition: "background-color", background: "gray.800" }}
        >
          <Link to="/event/1">Event</Link>
        </Text>
        <Text
          _hover={{ transition: "background-color", background: "gray.800" }}
        >
          <Link to="/user/1">User</Link>
        </Text>
        <Text
          _hover={{ transition: "background-color", background: "gray.800" }}
        >
          <Link to="/event/new">Add</Link>
        </Text>
      </Flex>
    </Flex>
  );
};
