"use client";

import { Listing, User } from "@prisma/client";
import Container from "../Container";
import Heading from "../Heading";
import ListingCard from "../listings/ListingCard";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface PropertiesClientProps {
  properties: Listing[];
  currentUser: Partial<User>;
}

const PropertiesClient = ({
  properties,
  currentUser,
}: PropertiesClientProps) => {
  const router = useRouter();
  const [deletedId, setDeletedId] = useState("");

  const onDelete = useCallback(
    (propertyId: string) => {
      setDeletedId(propertyId);

      axios
        .delete(`/api/listings/${propertyId}`)
        .then(() => {
          router.refresh();
          toast.success("Property deleted!");
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
      <Heading title={"Properties"} subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {properties.map((property) => {
          return (
            <ListingCard
              key={property.id}
              data={property}
              currentUser={currentUser}
              disabled={deletedId === property.id}
              onAction={onDelete}
              actionId={property.id}
              actionLabel="Delete property"
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
