import React from "react";

interface TermsSectionProps {
  title: string;
  items: string[];
  note?: string;
}

export const TermsSection: React.FC<TermsSectionProps> = ({ title, items, note }) => {
  return (
    <section className="mb-8 p-5">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ul className="list-disc list-inside space-y-2">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {note && <p className="mt-4 italic">{note}</p>}
    </section>
  );
};

