import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "../components/favorites/FavoritesClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login first"
          showReset={false}
        />
      </ClientOnly>
    );
  }

  const favorites = await getFavorites();

  if (favorites?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites"
          subtitle="Look like you have no favorites"
          showReset={false}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient favorites={favorites} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;
