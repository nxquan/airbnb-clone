import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const POST = async (request: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    category,
    location,
    guestCount,
    roomCount,
    bathRoomCount,
    imageSrc,
    price,
    title,
    description,
  } = body;

  // Object.keys(body).forEach((value) => {
  //   if (!body[value]) {
  //     NextResponse.error();
  //   }
  // });

  const listing = await prisma.listing.create({
    data: {
      title,
      desc: description,
      category,
      bathRoomCount,
      guestCount,
      roomCount,
      price: parseInt(price, 10),
      image: imageSrc,
      locationValue: location.value,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
};
