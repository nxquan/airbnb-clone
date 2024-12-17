import prisma from "@/app/libs/prismadb";

interface IGetReservations {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations({
  listingId,
  authorId,
  userId,
}: IGetReservations) {
  try {
    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    return prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error: any) {}
}
