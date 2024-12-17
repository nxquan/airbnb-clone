"use client";

import { Listing, User } from "@prisma/client";
import Container from "../Container";
import Heading from "../Heading";
import ListingCard from "../listings/ListingCard";

interface FavoritesClientProps {
  favorites: Listing[];
  currentUser: Partial<User>;
}

const FavoritesClient = ({ favorites, currentUser }: FavoritesClientProps) => {
  return (
    <Container>
      <Heading title={"Favorites"} subtitle="List of place you have favored!" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favorites.map((favorite) => {
          return (
            <ListingCard
              key={favorite.id}
              data={favorite}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default FavoritesClient;
