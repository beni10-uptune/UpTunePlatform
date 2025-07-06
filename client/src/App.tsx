import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UniversalHeader } from "@/components/universal-header";
import LandingPage from "@/pages/landing";
import GameMenu from "@/pages/game-menu";
import GameRoom from "@/pages/game-room";
import Dashboard from "@/pages/dashboard";

import TeamsWaitlist from "@/pages/teams-waitlist";
import CommunityLists from "@/pages/community-lists";
import CommunityListDetail from "@/pages/community-list-detail";
import JourneysPage from "@/pages/journeys";
import JourneyPage from "@/pages/journey";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <UniversalHeader />
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/games" component={GameMenu} />
        <Route path="/game/:gameType" component={GameRoom} />
        <Route path="/room/:code" component={GameRoom} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/have-your-say" component={TeamsWaitlist} />
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
