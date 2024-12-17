"use client";

import { Listing, Reservation, User } from "@prisma/client";
import Container from "../Container";
import Heading from "../Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../listings/ListingCard";

interface ReservationsClientProps {
  currentUser: Partial<User>;
  reservations: ({ listing: Listing } & Reservation)[];
}

const ReservationsClient = ({
  currentUser,
  reservations,
}: ReservationsClientProps) => {
  const router = useRouter();
  const [deletedId, setDeletedId] = useState("");

  const onCancel = useCallback(
    (reservationId: string) => {
      setDeletedId(reservationId);

      axios
        .delete(`/api/reservations/${reservationId}`)
        .then(() => {
          router.refresh();
          toast.success("Reservation canceled!");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletedId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="My reservations" subtitle="Bookings on your properties" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              actionLabel="Cancel guest reservation"
              currentUser={currentUser}
              disabled={deletedId === reservation.id}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default ReservationsClient;
