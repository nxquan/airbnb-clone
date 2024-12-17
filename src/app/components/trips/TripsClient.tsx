"use client";

import { Listing, Reservation, User } from "@prisma/client";
import Container from "../Container";
import Heading from "../Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../listings/ListingCard";

interface TripsClientProps {
  currentUser: Partial<User>;
  reservations: ({ Listing: Listing } & Reservation)[];
}

const TripsClient = ({ currentUser, reservations }: TripsClientProps) => {
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
      <Heading
        title={"Trips"}
        subtitle="Where you're been and where you're going"
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              data={reservation.Listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
              disabled={deletedId === reservation.id}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default TripsClient;
