import { Phone, Mail } from "lucide-react";

const socialLinks = [
  { icon: "𝕏", href: "#", label: "Twitter" },
  { icon: "f", href: "#", label: "Facebook" },
  { icon: "▶", href: "#", label: "YouTube" },
  { icon: "in", href: "#", label: "LinkedIn" },
  { icon: "📷", href: "#", label: "Instagram" },
];

const TopBar = () => {
  return (
    <>
      {/* Social bar */}
      <div className="bg-naps-dark text-primary-foreground">
        <div className="container mx-auto flex items-center gap-3 px-4 py-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs opacity-70 hover:opacity-100 transition-opacity"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Header bar */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-naps-blue flex items-center justify-center text-primary-foreground font-heading font-bold text-sm">
              UJ
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg leading-tight text-foreground tracking-wide">
                PHYSICS DEPARTMENT
              </h1>
              <p className="font-heading text-sm text-naps-blue font-semibold tracking-widest">
                UNIJOS
              </p>
            </div>
          </div>

          {/* Right links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="#" className="hover:text-foreground">Home</a>
              <span className="text-border">|</span>
              <a href="#" className="hover:text-foreground">FAQ</a>
              <span className="text-border">|</span>
              <a href="#" className="hover:text-foreground">Contact</a>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground text-xs">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                Call us today 073-61095 ext 194
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                physics@unijos.edu.ng
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
