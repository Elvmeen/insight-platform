import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "NEWS", href: "#" },
  { label: "COURSES", href: "#", hasDropdown: true },
  { label: "GP CALCULATOR", href: "#" },
  { label: "DEPARTMENTAL MEMBERS", href: "#" },
  { label: "EVENTS", href: "#" },
  { label: "EXTRA RESOURCES", href: "/resources" },
  { label: "ABOUT DEPARTMENT", href: "#" },
  { label: "PAGES", href: "#", hasDropdown: true },
];

const MainNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-naps-dark">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between md:hidden py-3">
          <span className="text-primary-foreground font-heading font-semibold text-sm">Menu</span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-primary-foreground"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <ul
          className={`${
            mobileOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-stretch`}
        >
          {navItems.map((item) => {
            const active =
              (item.href === "/" && location.pathname === "/") ||
              (item.href !== "/" && item.href !== "#" && location.pathname.startsWith(item.href));
            const classes = `flex items-center gap-1 px-4 py-3 text-xs font-heading font-semibold tracking-wide transition-colors ${
              active
                ? "bg-naps-blue text-primary-foreground"
                : "text-primary-foreground/80 hover:bg-naps-blue/60 hover:text-primary-foreground"
            }`;
            return (
              <li key={item.label}>
                {item.href.startsWith("/") ? (
                  <Link to={item.href} className={classes} onClick={() => setMobileOpen(false)}>
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
                  </Link>
                ) : (
                  <a href={item.href} className={classes}>
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default MainNav;
