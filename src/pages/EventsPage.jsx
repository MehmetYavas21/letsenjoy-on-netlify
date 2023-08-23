import React, { useState, useEffect } from "react";
import { Box, Center, Flex } from "@chakra-ui/react";
import { TextInput } from "../components/ui/TextInput";
import { Button } from "../components/ui/Button";
import { useLoaderData } from "react-router";
import { CategoryFilter } from "../components/CategoryFilter";
import { EventsList } from "../components/EventsList";
import { Link, redirect } from "react-router-dom";
import { HeroSection } from "../components/HeroSection";

export const loader = async () => {
  const events = await fetch(
    "https://my-json-server.typicode.com/MehmetYavas21/party-time/events"
  );
  const users = await fetch(
    "https://my-json-server.typicode.com/MehmetYavas21/party-time/users"
  );
  const categories = await fetch(
    "https://my-json-server.typicode.com/MehmetYavas21/party-time/categories"
  );

  return {
    events: await events.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const { events, users, categories } = useLoaderData();

  const [matchedEvents, setMatchedEvents] = useState([]);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    setMatchedEvents(events);
  }, [events]);

  const handleChange = (e) => {
    setSearchField(e.target.value);

    const matchedEvents = events?.filter((filteredEvent) => {
      return filteredEvent?.title
        .toLowerCase()
        .includes(searchField.toLowerCase().trim());
    });
    setMatchedEvents(matchedEvents || []);
  };

  const handleFilter = (selectedCategory) => {
    if (!selectedCategory) {
      setMatchedEvents(events);
      return;
    }

    const categoryId = parseInt(selectedCategory);
    const filteredEvents = events.filter((event) => {
      if (Array.isArray(event.categoryIds)) {
        return event.categoryIds.includes(categoryId);
      } else {
        return event.categoryIds == categoryId;
      }
    });
    setMatchedEvents(filteredEvents);
  };

  const handleDeleteEvent = async (eventId) => {
    async function checkAnswer(eventId) {
      const answer = prompt(
        `are you sure you want to delete "${
          events.find((event) => event.id == eventId).title
        }"`,
        'if you say "yes", it will be permenantly deleted!'
      );
      console.log("answer", answer);
      if (answer.toLowerCase() === "yes") {
        await fetch(
          `https://my-json-server.typicode.com/MehmetYavas21/party-time/events/${eventId}`,
          {
            method: "DELETE",
          }
        )
          .then(() => {
            alert(
              `You deleted "${
                events.find((event) => event.id == eventId).title
              }"`
            );
          })
          .then(redirect(`/`));
      } else {
        alert("please refresh the page");
      }
    }

    checkAnswer(eventId);
    // Update the events list after deletion
    setMatchedEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  return (
    <Center flexDir="column" alignItems="center">
      <Box p={6} bg="blue.100">
        <HeroSection events={events} />
      </Box>
      <Flex justify="space-between">
        <Box p={4}>
          <TextInput changeFn={handleChange} />
        </Box>
        <Box p={4}>
          <CategoryFilter categories={categories} handleFilter={handleFilter} />
        </Box>
      </Flex>

      <Link to={"/event/new"}>
        <Button>Create Event</Button>
      </Link>

      <EventsList
        matchedEvents={matchedEvents}
        handleDeleteEvent={handleDeleteEvent}
        users={users}
        categories={categories}
      />
    </Center>
  );
};
