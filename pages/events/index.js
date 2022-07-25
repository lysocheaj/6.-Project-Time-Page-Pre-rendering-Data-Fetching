import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import { Fragment } from "react";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from 'next/router';

function AllEventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function eventsSearchHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <div>
      <Fragment>
        <EventsSearch onSearch={eventsSearchHandler} />
        <EventList items={events} />
      </Fragment>
    </div>
  );
}

export default AllEventsPage;
