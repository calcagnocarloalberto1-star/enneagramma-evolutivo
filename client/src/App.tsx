import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import TestPage from "@/pages/TestPage";
import TestResults from "@/pages/TestResults";
import CoupleCompatibility from "@/pages/CoupleCompatibility";
import FamilyCompatibility from "@/pages/FamilyCompatibility";
import WorkCompatibility from "@/pages/WorkCompatibility";
import PercorsiVita from "@/pages/PercorsiVita";
import EnneatipiList from "@/pages/EnneatipiList";
import EnneatipoDetail from "@/pages/EnneatipoDetail";
import BlogList from "@/pages/BlogList";
import BlogArticle from "@/pages/BlogArticle";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import CookiePolicy from "@/pages/CookiePolicy";
import Glossario from "@/pages/Glossario";
import Admin from "@/pages/Admin";
import CivilMediation from "@/pages/CivilMediation";
import FamilyMediation from "@/pages/FamilyMediation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function AppRouter() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/test" component={TestPage} />
          <Route path="/test/results/:id" component={TestResults} />
          <Route path="/compatibilita/coppia" component={CoupleCompatibility} />
          <Route path="/compatibilita/famiglia" component={FamilyCompatibility} />
          <Route path="/compatibilita/lavoro" component={WorkCompatibility} />
          <Route path="/mediazione/civile" component={CivilMediation} />
          <Route path="/mediazione/familiare" component={FamilyMediation} />
          <Route path="/percorsi" component={PercorsiVita} />
          <Route path="/enneatipi" component={EnneatipiList} />
          <Route path="/enneatipi/:id" component={EnneatipoDetail} />
          <Route path="/blog" component={BlogList} />
          <Route path="/blog/:slug" component={BlogArticle} />
          <Route path="/about" component={About} />
          <Route path="/faq" component={FAQ} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/cookies" component={CookiePolicy} />
          <Route path="/termini" component={Terms} />
          <Route path="/terms" component={Terms} />
          <Route path="/cookie-policy" component={CookiePolicy} />
          <Route path="/glossario" component={Glossario} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router hook={useHashLocation}>
          <AppRouter />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
