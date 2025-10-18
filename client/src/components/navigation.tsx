import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Compass, BookOpen, Users, Gamepad2, User, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  variant?: "header" | "mobile" | "minimal";
  className?: string;
}

export function Navigation({ variant = "header", className = "" }: NavigationProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/discover", label: "Discover", icon: Compass },
    { href: "/play", label: "Play Together", icon: Gamepad2 },
    { href: "/you", label: "You", icon: User },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  if (variant === "minimal") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Link href="/discover">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Compass className="w-4 h-4 mr-1" />
            Discover
          </Button>
        </Link>
        <Link href="/play">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Gamepad2 className="w-4 h-4 mr-1" />
            Play
          </Button>
        </Link>
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div className={`md:hidden ${className}`}>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
        
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-white/20 z-50">
            <div className="p-4 space-y-2">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-white hover:bg-white/20 ${
                      isActive(href) ? "bg-white/20" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <nav className={`hidden md:flex items-center gap-6 ${className}`}>
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href}>
          <Button
            variant="ghost"
            className={`text-white hover:bg-white/20 ${
              isActive(href) ? "bg-white/20" : ""
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </Button>
        </Link>
      ))}
    </nav>
  );
}