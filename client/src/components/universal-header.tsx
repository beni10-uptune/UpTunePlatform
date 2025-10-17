import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Play, Sparkles, Users, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PlayMegaMenu } from "@/components/play-mega-menu";
import { DiscoverMegaMenu } from "@/components/discover-mega-menu";
import { ForGroupsMegaMenu } from "@/components/for-groups-mega-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function UniversalHeader() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [playMenuOpen, setPlayMenuOpen] = useState(false);
  const [discoverMenuOpen, setDiscoverMenuOpen] = useState(false);
  const [groupsMenuOpen, setGroupsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const isPlayActive = location === "/" || location.startsWith("/game") || location.startsWith("/room");
  const isDiscoverActive = location.startsWith("/discover") ||
    location.startsWith("/journeys") ||
    location.startsWith("/community-lists");
  const isGroupsActive = location.startsWith("/groups") || location.startsWith("/teams");

  return (
    <>
      <PlayMegaMenu isOpen={playMenuOpen} onClose={() => setPlayMenuOpen(false)} />
      <DiscoverMegaMenu isOpen={discoverMenuOpen} onClose={() => setDiscoverMenuOpen(false)} />
      <ForGroupsMegaMenu isOpen={groupsMenuOpen} onClose={() => setGroupsMenuOpen(false)} />
      <header className="bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-400 border-b-4 border-black sticky top-0 z-50 shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="text-black font-black text-2xl hover:scale-110 transition-transform cursor-pointer bg-white px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>
              UPTUNE
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            {/* Play Mega Menu Trigger */}
            <Button
              size="sm"
              className={`font-black text-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all ${
                isPlayActive
                  ? "bg-white rotate-2"
                  : "bg-cyan-400 hover:bg-cyan-500 -rotate-1"
              }`}
              style={{ fontFamily: "'Arial Black', sans-serif" }}
              onClick={() => setPlayMenuOpen(!playMenuOpen)}
            >
              <Play className="w-4 h-4 mr-2" />
              PLAY
            </Button>

            {/* Discover Mega Menu Trigger */}
            <Button
              size="sm"
              className={`font-black text-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all ${
                isDiscoverActive
                  ? "bg-white rotate-2"
                  : "bg-pink-400 hover:bg-pink-500 rotate-1"
              }`}
              style={{ fontFamily: "'Arial Black', sans-serif" }}
              onClick={() => setDiscoverMenuOpen(!discoverMenuOpen)}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              DISCOVER
            </Button>

            {/* For Groups Mega Menu Trigger */}
            <Button
              size="sm"
              className={`font-black text-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all ${
                isGroupsActive
                  ? "bg-white rotate-2"
                  : "bg-purple-400 hover:bg-purple-500 -rotate-1"
              }`}
              style={{ fontFamily: "'Arial Black', sans-serif" }}
              onClick={() => setGroupsMenuOpen(!groupsMenuOpen)}
            >
              <Users className="w-4 h-4 mr-2" />
              FOR GROUPS
            </Button>
            
            {/* User Menu */}
            <div className="ml-2 border-l-4 border-black pl-3 flex items-center gap-3">
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 border-3 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      {user.profileImageUrl ? (
                        <img
                          src={user.profileImageUrl}
                          alt="Profile"
                          className="w-6 h-6 object-cover border-2 border-black"
                        />
                      ) : (
                        <User className="w-5 h-5 text-black" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="px-3 py-2 bg-yellow-200 border-b-4 border-black">
                      <p className="text-sm font-black text-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                        {user.firstName || user.email || 'User'}
                      </p>
                      {user.email && (
                        <p className="text-xs text-black/70 font-bold">{user.email}</p>
                      )}
                    </div>
                    {isAuthenticated && (
                      <Link href="/dashboard">
                        <DropdownMenuItem className="text-black hover:bg-cyan-200 cursor-pointer font-bold">
                          <User className="w-4 h-4 mr-2" />
                          Dashboard
                        </DropdownMenuItem>
                      </Link>
                    )}
                    <DropdownMenuItem
                      onClick={() => window.location.href = '/api/logout'}
                      className="text-black hover:bg-pink-200 cursor-pointer font-bold"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  size="sm"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                  onClick={() => window.location.href = '/api/login'}
                >
                  SIGN IN
                </Button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              size="sm"
              className="bg-white text-black font-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t-4 border-black bg-yellow-200">
            <nav className="space-y-3 px-4">
              {/* Play Button */}
              <Link href="/">
                <Button
                  className={`w-full justify-start font-black text-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                    isPlayActive ? "bg-white" : "bg-cyan-300 hover:bg-cyan-400"
                  }`}
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  PLAY
                </Button>
              </Link>

              {/* Discover Button */}
              <Link href="/discover">
                <Button
                  className={`w-full justify-start font-black text-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                    isDiscoverActive ? "bg-white" : "bg-pink-300 hover:bg-pink-400"
                  }`}
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  DISCOVER
                </Button>
              </Link>

              {/* For Groups Button */}
              <Link href="/groups">
                <Button
                  className={`w-full justify-start font-black text-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                    isGroupsActive ? "bg-white" : "bg-purple-300 hover:bg-purple-400"
                  }`}
                  style={{ fontFamily: "'Arial Black', sans-serif" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Users className="w-4 h-4 mr-2" />
                  FOR GROUPS
                </Button>
              </Link>
              
              <div className="pt-3 border-t-4 border-black space-y-3 mt-3">
                {isAuthenticated && user ? (
                  <>
                    <div className="px-4 py-3 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex items-center gap-3">
                        {user.profileImageUrl ? (
                          <img
                            src={user.profileImageUrl}
                            alt="Profile"
                            className="w-10 h-10 object-cover border-3 border-black"
                          />
                        ) : (
                          <User className="w-10 h-10 text-black" />
                        )}
                        <div>
                          <p className="text-sm font-black text-black" style={{ fontFamily: "'Arial Black', sans-serif" }}>
                            {user.firstName || user.email || 'User'}
                          </p>
                          {user.email && (
                            <p className="text-xs text-black/70 font-bold">{user.email}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      className="w-full justify-start bg-red-400 hover:bg-red-500 text-white font-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      style={{ fontFamily: "'Arial Black', sans-serif" }}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.location.href = '/api/logout';
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full justify-start bg-cyan-400 hover:bg-cyan-500 text-black font-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    style={{ fontFamily: "'Arial Black', sans-serif" }}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.location.href = '/api/login';
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
    </>
  );
}