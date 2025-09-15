import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
// Remove or rename the duplicate Toaster import if not needed
// import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import LiveUpdates from "./pages/LiveUpdates";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="fitscan-theme">
        <TooltipProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/live-updates" element={<LiveUpdates />} />
                <Route path="/quiz/:toolId" element={<QuizPage />} />
                <Route path="/results/:toolId" element={<ResultsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Toaster />
            {/* Remove or replace the duplicate Sonner component if not needed */}
            {/* <Sonner /> */}
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
