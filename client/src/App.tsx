import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "@/pages/landing";
import GameMenu from "@/pages/game-menu";
import GameRoom from "@/pages/game-room";
import WeeklyChallenge from "@/pages/weekly-challenge";
import TeamsWaitlist from "@/pages/teams-waitlist";
import CommunityLists from "@/pages/community-lists";
import CommunityListDetail from "@/pages/community-list-detail";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/games" component={GameMenu} />
      <Route path="/game/:gameType" component={GameRoom} />
      <Route path="/room/:code" component={GameRoom} />
      <Route path="/have-your-say" component={CommunityLists} />
      <Route path="/teams" component={TeamsWaitlist} />
      <Route path="/community-lists" component={CommunityLists} />
      <Route path="/community-lists/:slug" component={CommunityListDetail} />
      <Route component={NotFound} />
    </Switch>
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
