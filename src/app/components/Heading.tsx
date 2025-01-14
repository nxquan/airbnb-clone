"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading = ({ title, center, subtitle }: HeadingProps) => {
  return (
    <div className={`${center ? "text-center" : "text-start"}`}>
      <div className="text-2xl font-bold">{title}</div>
      {subtitle && (
        <div className="font-medium text-neutral-500 mt-2">{subtitle}</div>
      )}
    </div>
  );
};

export default Heading;
