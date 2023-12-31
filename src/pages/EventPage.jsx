import React, { useState } from "react";
import { Text, Flex, Center, Button, Box, Select } from "@chakra-ui/react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { Event } from "../components/ui/Event";

export const loader = async ({ params }) => {
  const event = await fetch(
    `https://my-json-server.typicode.com/MehmetYavas21/letsenjoy-on-netlify/events/${params.eventId}`
  ).then((res) => res.json());

  const users = await fetch(
    "https://my-json-server.typicode.com/MehmetYavas21/letsenjoy-on-netlify/users"
  ).then((res) => res.json());

  const categories = await fetch(
    "https://my-json-server.typicode.com/MehmetYavas21/letsenjoy-on-netlify/categories"
  ).then((res) => res.json());

  const events = await fetch(
    "https://my-json-server.typicode.com/MehmetYavas21/letsenjoy-on-netlify/events"
  ).then((res) => res.json());

  return {
    event: event,
    users: users,
    categories: categories,
    events: events,
  };
};

export const EventPage = () => {
  const { event, users, categories, events } = useLoaderData();
  const [matchedEvent, setMatchedEvent] = useState();

  const navigate = useNavigate();

  const handleDeleteEvent = async () => {
    async function checkAnswer() {
      const answer = prompt(
        `are you sure you want to delete "${event.title}"`,
        'if you say "yes", it will be permenantly deleted!'
      );
      if (answer.toLowerCase() === "yes") {
        await fetch(
          `https://my-json-server.typicode.com/MehmetYavas21/letsenjoy-on-netlify/events/${event.id}`,
          {
            method: "DELETE",
          }
        ).then(() => {
          alert(`You deleted "${event.title}"`);
          navigate("/");
        });
      } else {
        alert(`you canceled to delete ${event.title}`);
        navigate("/event/:eventId");
      }
    }

    checkAnswer();
  };

  const handleChange = (e) => {
    const selectedEvent = events.filter((item) => {
      return item.title === e.target.value;
    });
    setMatchedEvent(selectedEvent[0]);
  };

  const SelectionBox = () => {
    return (
      <Select onChange={(ev) => handleChange(ev)}>
        {events.map((e) => {
          return <option key={e.id}>{e.title}</option>;
        })}
      </Select>
    );
  };

  if (!event) {
    return (
      <Flex>
        <Loading />
        <Text>Just a moment...</Text>
      </Flex>
    );
  }

  return (
    <Center flexDir="column" alignItems="center">
      {matchedEvent ? (
        <>
          <Box m="auto" p="10px">
            <SelectionBox />
          </Box>
          <Event users={users} event={matchedEvent} categories={categories} />
        </>
      ) : (
        <>
          <Box m="auto" p="10px">
            <SelectionBox />
          </Box>
          <Event users={users} event={event} categories={categories} />
        </>
      )}

      <Flex p={4} flexDir="row" justify="space-between" align="center">
        <Link to={`/event/edit/${event.id}`}>
          <Button style={{ background: "#319795", color: "white" }}>
            Edit
          </Button>
        </Link>
        <Button ml={2} onClick={handleDeleteEvent} colorScheme="red">
          Delete
        </Button>
      </Flex>
    </Center>
  );
};
