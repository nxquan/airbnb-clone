import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const currentUser = await getCurrentUser();
  const listings = await getListings({
    ...searchParams,
    userId: searchParams?.userId || currentUser?.id,
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset={true} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => {
            return (
              <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
                actionId={listing.id}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
