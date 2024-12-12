"use client";

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset: boolean;
}

const EmptyState = ({
  showReset,
  subtitle = "Try changing or removing some of your filters",
  title = "No exact matches",
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center gap-2 flex-col h-[60vh]">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            primary
            label={"Remove all filters"}
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
