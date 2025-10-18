import { Switch, Route, Redirect, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UniversalHeader } from "@/components/universal-header";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@/contexts/AuthContext";
import LandingPage from "@/pages/landing";
import GameMenu from "@/pages/game-menu";
import GameRoom from "@/pages/game-room";
import Dashboard from "@/pages/dashboard";
import { useEffect } from "react";

import TeamsWaitlist from "@/pages/teams-waitlist";
import GroupsPage from "@/pages/groups";
import CommunityLists from "@/pages/community-lists";
import CommunityListDetail from "@/pages/community-list-detail";
import JourneysPage from "@/pages/journeys";
import JourneyPage from "@/pages/journey";
import DiscoverPage from "@/pages/discover";
import DesignPreview from "@/pages/design-preview";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <UniversalHeader />
      <Switch>
        <Route path="/" component={LandingPage} />

        {/* Main Navigation Routes */}
        <Route path="/discover" component={DiscoverPage} />
        <Route path="/play" component={GameMenu} />
        <Route path="/you" component={Dashboard} />

        {/* Detail Pages */}
        <Route path="/discover/journeys/:slug" component={JourneyPage} />
        <Route path="/discover/lists/:slug" component={CommunityListDetail} />

        {/* Game Routes */}
        <Route path="/game/:gameType" component={GameRoom} />
        <Route path="/room/:code" component={GameRoom} />

        {/* Dedicated Pillar Pages (accessible but not in main nav) */}
        <Route path="/journeys" component={JourneysPage} />

        {/* Other Pages */}
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/groups" component={GroupsPage} />
        <Route path="/groups/:category" component={GroupsPage} />
        <Route path="/have-your-say" component={TeamsWaitlist} />
        <Route path="/teams" component={TeamsWaitlist} />
        <Route path="/design-preview" component={DesignPreview} />

        {/* Legacy/Redirect Routes */}
        <Route path="/games" component={() => <Redirect to="/play" />} />
        <Route path="/community-lists" component={() => <Redirect to="/discover" />} />
        <Route path="/community-lists/:slug" component={({ params }) => <Redirect to={`/discover/lists/${params.slug}`} />} />
        <Route path="/musicaljourneys" component={() => <Redirect to="/discover" />} />
        <Route path="/journeys/:slug" component={({ params }) => <Redirect to={`/discover/journeys/${params.slug}`} />} />

        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
          <Analytics />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
