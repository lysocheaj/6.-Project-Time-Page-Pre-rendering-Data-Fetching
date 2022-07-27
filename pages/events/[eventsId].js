import { useRouter } from "next/router";
// import { getEventById } from "../../dummy-data";
import { getEventById, getAllEvents } from "../../helpers/api-util";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

function EventDetailPage(props) {
  const router = useRouter();
  const eventID = router.query.eventsId;
  const event = props.events;

  console.log("event: ", event);

  if (!event) {
    return <p>Event page not found!</p>;
  }

  return (
    <div>
      <Fragment>
        <EventSummary title={event.title} />
        <EventLogistics
          date={event.date}
          address={event.location}
          image={event.image}
          imageAlt={event.title}
        />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </Fragment>
    </div>
  );
}

export async function getStaticProps(constext) {
  const eventId = constext.params.eventsId;
  const event = await getEventById(eventId);
  return {
    props: { events: event },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({ params: { eventsId: event.id } }));
  return {
    paths: paths,
    fallback: false,
  };
}

export default EventDetailPage;
