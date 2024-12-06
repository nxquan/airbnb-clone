import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, password } = body;

  const isEmailUsed = await prisma.user.count({
    where: {
      email,
    },
  });

  if (isEmailUsed > 0) {
    return NextResponse.json({ message: "Email is used" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALTS_OR_ROUNDS) ?? 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user);
}
