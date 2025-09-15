import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { LanguageProvider } from "./contexts/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import LiveUpdates from "./pages/LiveUpdates";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <TooltipProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/quiz/:toolId" element={<QuizPage />} />
                <Route path="/results/:toolId" element={<ResultsPage />} />
                <Route path="/live-updates" element={<LiveUpdates />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
