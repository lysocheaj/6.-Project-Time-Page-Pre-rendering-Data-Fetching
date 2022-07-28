import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from "../../helpers/api-util";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage(props) {
  const event = props.events;

  if (!event) {
    return (
      <ErrorAlert>
        <p>Loading....</p>
      </ErrorAlert>
    );
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
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  try {
    var even = await getFeaturedEvents();

    var paths = even.map((event) => ({ params: { eventsId: event.id } }));
    console.log("path", JSON.stringify(paths));
  } catch (error) {
    error.message;
  }

  return {
    paths: paths,
    fallback: true,
  };
}

export default EventDetailPage;
