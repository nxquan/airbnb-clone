import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "../components/properties/PropertiesClient";

const PropertiesPage = async () => {
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

  const properties = await getListings({ userId: currentUser.id });

  if (properties.length == 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties"
          subtitle="You have no properties"
          showReset={false}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient properties={properties} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
