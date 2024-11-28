import { useState, useEffect, useRef } from "react";

const Sidebar = () => {
  const [focusedIndex, setFocusedIndex] = useState(null);
  const isLinkClick = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isLinkClick.current) {
        setFocusedIndex(null);
      }
      isLinkClick.current = false;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (index) => {
    setFocusedIndex(index);
    isLinkClick.current = true;
  };

  const links = [
    { href: "#carSection", label: "Cars" },
    { href: "#statsSection", label: "Stats" },
    { href: "#winLossSection", label: "Win/Loss" },
    { href: "#movementSection", label: "Movement" },
    { href: "#overtimeSection", label: "Overtimes" },
    { href: "#demoSection", label: "Demolitions" },
    { href: "#mapSection", label: "Maps" },
    { href: "#dateSection", label: "Dates" },
  ];

  return (
    <div className="sidebar">
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className={focusedIndex === index ? "sidebar-focused" : ""}
              onClick={() => handleLinkClick(index)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
