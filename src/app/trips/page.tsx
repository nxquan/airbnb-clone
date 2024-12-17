import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import TripsClient from "../components/trips/TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login first!"
          showReset={false}
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations && reservations?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Trips not found"
          subtitle="Look like you haven't booked any trips yet!"
          showReset={false}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient currentUser={currentUser} reservations={reservations!} />
    </ClientOnly>
  );
};

export default TripsPage;
