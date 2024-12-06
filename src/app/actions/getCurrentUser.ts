import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        reservations: true,
        favoriteIds: true,
        accounts: true,
        listings: true,
      },
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
}
