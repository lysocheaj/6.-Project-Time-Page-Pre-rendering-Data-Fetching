export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-course-53929-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  allEvents.filter((event) => event.isFeatered);
}
