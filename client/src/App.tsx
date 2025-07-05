import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UniversalHeader } from "@/components/universal-header";
import { useAuth } from "@/hooks/useAuth";
import LandingPage from "@/pages/landing";
import LandingAuth from "@/pages/landing-auth";
import HomeAuth from "@/pages/home-auth";
import GameMenu from "@/pages/game-menu";
import GameRoom from "@/pages/game-room";

import TeamsWaitlist from "@/pages/teams-waitlist";
import CommunityLists from "@/pages/community-lists";
import CommunityListDetail from "@/pages/community-list-detail";
import JourneysPage from "@/pages/journeys";
import JourneyPage from "@/pages/journey";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <>
      <Switch>
        {isLoading ? (
          <Route path="/" component={() => <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center"><div className="text-white">Loading...</div></div>} />
        ) : !isAuthenticated ? (
          <>
            <Route path="/" component={LandingAuth} />
            <Route path="/games" component={LandingAuth} />
            <Route path="/game/:gameType" component={LandingAuth} />
            <Route path="/room/:code" component={LandingAuth} />
            <Route path="/have-your-say" component={LandingAuth} />
            <Route path="/teams" component={LandingAuth} />
            <Route path="/community-lists" component={LandingAuth} />
            <Route path="/community-lists/:slug" component={LandingAuth} />
            <Route path="/journeys" component={LandingAuth} />
            <Route path="/musicaljourneys" component={LandingAuth} />
            <Route path="/journeys/:slug" component={LandingAuth} />
            <Route path="/blog" component={LandingAuth} />
            <Route path="/blog/:slug" component={LandingAuth} />
            <Route component={LandingAuth} />
          </>
        ) : (
          <>
            <UniversalHeader />
            <Switch>
              <Route path="/" component={HomeAuth} />
              <Route path="/games" component={GameMenu} />
              <Route path="/game/:gameType" component={GameRoom} />
              <Route path="/room/:code" component={GameRoom} />
              <Route path="/have-your-say" component={CommunityLists} />
              <Route path="/teams" component={TeamsWaitlist} />
              <Route path="/community-lists" component={CommunityLists} />
              <Route path="/community-lists/:slug" component={CommunityListDetail} />
              <Route path="/journeys" component={JourneysPage} />
              <Route path="/musicaljourneys" component={() => <Redirect to="/journeys" />} />
              <Route path="/journeys/:slug" component={JourneyPage} />
              <Route path="/blog" component={Blog} />
              <Route path="/blog/:slug" component={BlogPost} />
              <Route component={NotFound} />
            </Switch>
          </>
        )}
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
