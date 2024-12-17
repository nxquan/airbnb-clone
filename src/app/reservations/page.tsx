import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "../components/reservations/ReservationsClient";

const ReservationsPage = async () => {
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

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations && reservations?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Reservations not found"
          subtitle="Look like you have no reservations on your properties!"
          showReset={false}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        currentUser={currentUser}
        reservations={reservations!}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
