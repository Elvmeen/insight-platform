import { ChevronRight } from "lucide-react";

const links = [
  { label: "News", href: "#" },
  { label: "Departmental Members", href: "#" },
  { label: "GP Calculator", href: "#" },
  { label: "Events", href: "#" },
];

const QuickLinks = () => {
  return (
    <section>
      <h2 className="font-heading text-xl font-bold text-naps-blue border-t-4 border-naps-gold pt-2 mb-6">
        Quick Links
      </h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-naps-blue hover:underline inline-flex items-center gap-1"
            >
              <ChevronRight className="w-3 h-3" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default QuickLinks;
