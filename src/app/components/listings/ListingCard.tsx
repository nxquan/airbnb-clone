"use client";

import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";

import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCartProps {
  data: Listing;
  reservation?: Reservation;
  currentUser?: Partial<User> | null;
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
  disabled?: boolean;
}

const ListingCard = ({
  data,
  actionId = "",
  actionLabel,
  currentUser,
  onAction,
  reservation,
  disabled,
}: ListingCartProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handleClickButtons = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation?.totalPrice) return reservation.totalPrice;

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full h-full relative overflow-hidden rounded-xl aspect-square">
          <Image
            src={
              data.image ||
              "https://media.istockphoto.com/id/517188688/vi/anh/phong-c%E1%BA%A3nh-n%C3%BAi-non.jpg?s=612x612&w=0&k=20&c=WWWaejSo6EWGZMZSK7QK6LCfwd0rL2KB3ImCX2VkW4A="
            }
            alt={"Listing image"}
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            label={actionLabel}
            small
            primary
            onClick={handleClickButtons}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
