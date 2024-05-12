import React from "react";

interface SectionHeadingProps {
  title: string;
  description: string;
}

export default function SectionHeading({
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="grid gap-2">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-gray-500 dark:text-gray-400"> {description}</p>
    </div>
  );
}
