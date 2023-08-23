import React from "react";
import { Flex, Link, Heading } from "@chakra-ui/react";

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
        opacity="0.9"
        p="15px"
        borderRadius="50px"
        fontFamily="fantasy"
        _hover={{
          size: "xl",
          transition: "bg",
          bg: "green.200",
          color: "white",
          textDecoration: "none",
          opacity: "0.2",
        }}
      >
        <Link href="/"> EnJoY</Link>
      </Heading>
      <Flex>
        <Link
          href="/"
          mx={2}
          _hover={{ transition: "bg", bg: "blackAlpha.300" }}
        >
          Home
        </Link>
        <Link
          href="/event/1"
          mx={2}
          _hover={{ transition: "bg", bg: "blackAlpha.300" }}
        >
          Event
        </Link>
        <Link
          href="/user/1"
          mx={2}
          _hover={{ transition: "bg", bg: "blackAlpha.300" }}
        >
          User
        </Link>
        <Link
          href="/event/new"
          mx={2}
          _hover={{ transition: "bg", bg: "blackAlpha.300" }}
        >
          Add
        </Link>
      </Flex>
    </Flex>
  );
};
