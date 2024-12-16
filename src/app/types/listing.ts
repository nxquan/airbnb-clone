import { Listing, User } from "@prisma/client";

export type SafeListing = Listing & {
  user: User;
};
