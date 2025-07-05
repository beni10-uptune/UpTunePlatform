import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Music, Users, BookOpen, Trophy } from "lucide-react";
import { useState } from "react";

export function UniversalHeader() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/journeys", label: "Musical Journeys", icon: Music },
    { href: "/community-lists", label: "Community Playlists", icon: Users },
    { href: "/blog", label: "Blog", icon: BookOpen },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className="bg-black/20 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="text-white font-bold text-xl hover:text-purple-300 transition-colors cursor-pointer">
              Uptune
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-white hover:bg-white/20 transition-colors ${
                    isActive(href) ? "bg-white/10" : ""
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Button>
              </Link>
            ))}
            
            <div className="ml-2 border-l border-white/20 pl-2">
              <Link href="/teams">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  For Teams
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="space-y-2">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-white hover:bg-white/20 ${
                      isActive(href) ? "bg-white/10" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </Button>
                </Link>
              ))}
              
              <div className="pt-2 border-t border-white/20">
                <Link href="/teams">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    For Teams
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}