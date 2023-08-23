import { Card, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  const user = await fetch(
    `https://my-json-server.typicode.com/MehmetYavas21/party-time/users/${params.userId}`
  ).then((res) => res.json());
  const events = await fetch(
    `https://my-json-server.typicode.com/MehmetYavas21/party-time/events`
  ).then((res) => res.json());
  const categories = await fetch(
    `https://my-json-server.typicode.com/MehmetYavas21/party-time/categories`
  ).then((res) => res.json());

  return {
    events: events,
    user: user,
    categories: categories,
  };
};

export const User = () => {
  const { user, events } = useLoaderData();

  const event = events?.filter((event) => user.id == event.createdBy);

  return (
    <Card m="5%" bg="blue.900" color="whiteAlpha.600" shadow="dark-lg">
      <Flex align="center" justifyContent="space-around">
        <img
          src={user.image}
          alt={user.name}
          width="200px"
          style={{ borderRadius: "100px", padding: "10px" }}
        />
        <Heading>{user.name}</Heading>
      </Flex>
      <Heading m="auto" p="5%" color="whiteAlpha.800">
        -- My Events --
      </Heading>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3 }}
        justifyItems="center"
        gap={5}
      >
        {event.map((e) => (
          <Flex
            key={e.id}
            style={{ listStyle: "none", margin: "10px" }}
            flexDir="column"
            align="center"
          >
            <Link to={`/event/${e.id}`}>
              <img
                src={e.image}
                alt={e.title}
                style={{
                  border: "2px solid blue",
                  width: "80px",
                  height: "80px",
                  borderRadius: "40px",
                  padding: "5px",
                  margin: "5px",
                }}
              />
            </Link>
            <Link to={`/event/${e.id}`}>
              <Text>{e.title}</Text>
            </Link>
          </Flex>
        ))}
      </SimpleGrid>
    </Card>
  );
};
