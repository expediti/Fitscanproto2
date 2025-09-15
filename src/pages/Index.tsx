import { useState } from "react";
import { Search, ChevronRight, Mail, Instagram, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ToolCard from "@/components/ToolCard";
import VoiceHealthChatbot from "@/components/HealthChatbot";
import { healthTools, categories } from "@/data/tools";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  // Mock health tools if the import fails
  const defaultTools = [
    {
      id: "anxiety-assessment",
      title: "Anxiety Assessment",
      description: "Comprehensive evaluation of anxiety symptoms and their impact on daily life",
      category: "Mental Health",
      difficulty: "Easy",
      estimatedTime: "6-8 min",
      icon: "🧠"
    },
    {
      id: "asthma-checker",
      title: "Asthma Symptom Checker", 
      description: "Comprehensive assessment of respiratory symptoms that might indicate asthma",
      category: "Respiratory",
      difficulty: "Easy", 
      estimatedTime: "6-8 min",
      icon: "🫁"
    },
    {
      id: "covid-checker",
      title: "COVID-19 Symptom Checker",
      description: "Assessment of symptoms that might indicate COVID-19 infection",
      category: "Infectious Disease",
      difficulty: "Easy",
      estimatedTime: "5-7 min", 
      icon: "🦠"
    },
    {
      id: "diabetes-risk",
      title: "Diabetes Risk Assessment",
      description: "Evaluation of risk factors for developing diabetes",
      category: "Metabolic Health",
      difficulty: "Easy",
      estimatedTime: "6-8 min",
      icon: "🩺"
    },
    {
      id: "depression-assessment", 
      title: "Depression Assessment",
      description: "Evaluation of depressive symptoms and their impact on daily functioning",
      category: "Mental Health",
      difficulty: "Easy",
      estimatedTime: "7-9 min",
      icon: "💭"
    },
    {
      id: "heart-risk",
      title: "Heart Disease Risk Assessment", 
      description: "Evaluation of cardiovascular health and risk factors",
      category: "Heart Health",
      difficulty: "Medium",
      estimatedTime: "8-10 min",
      icon: "❤️"
    }
  ];

  // Use imported tools or fallback to default
  const toolsToUse = healthTools && healthTools.length > 0 ? healthTools : defaultTools;
  const categoriesToUse = categories && categories.length > 0 ? categories : 
    ["All", "Mental Health", "Respiratory", "Infectious Disease", "Metabolic Health", "Heart Health"];

  const filteredTools = toolsToUse.filter((tool) => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStartTool = (toolId: string) => {
    console.log("Navigating to quiz page for tool:", toolId);
    navigate(`/quiz/${toolId}`);
  };

  const handleAISearch = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* COMPACT AI SEARCH BAR - GOOGLE STYLE */}
      <div className="px-4 py-6 md:py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Small AI Badge */}
          <div className="mb-4">
            <Badge className="px-3 py-1 bg-blue-100 text-blue-700 border-blue-200 text-xs">
              🤖 AI Health Assistant
            </Badge>
          </div>

          {/* COMPACT SEARCH BAR - GOOGLE STYLE */}
          <div 
            className="cursor-pointer group mb-6"
            onClick={handleAISearch}
          >
            <div className="relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 group-hover:border-blue-400">
              <div className="flex items-center gap-3 px-4 py-3 md:px-5 md:py-4">
                <Search className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                
                <div className="flex-1 text-left text-gray-500 dark:text-gray-400 text-sm md:text-base">
                  Ask about your health symptoms...
                </div>
                
                <div className="bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                  <span className="text-sm">✨</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Example Pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {[
              "Chest pain",
              "Headache", 
              "Fever",
              "Anxiety"
            ].map((example) => (
              <button
                key={example}
                onClick={() => navigate(`/chat?q=${encodeURIComponent(example)}`)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Compact Search and Filter */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search health tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
            
            {/* Category Pills - Horizontal Scroll on Mobile */}
            <div className="overflow-x-auto">
              <div className="flex gap-2 pb-2 min-w-max md:min-w-0 md:flex-wrap">
                {categoriesToUse.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/10 text-foreground whitespace-nowrap"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tools Grid - Mobile Optimized */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  id={tool.id}
                  title={tool.title}
                  description={tool.description}
                  category={tool.category}
                  difficulty={tool.difficulty}
                  estimatedTime={tool.estimatedTime}
                  icon={tool.icon}
                  onStartTool={handleStartTool}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-muted-foreground mb-4 text-sm">No tools found matching your criteria.</div>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                variant="outline"
                size="sm"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

{/* Footer with Icons */}
<footer className="border-t border-border px-4 py-8">
  <div className="max-w-4xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <Heart className="h-5 w-5 text-primary" />
        <span className="text-lg font-semibold text-foreground">FitScan</span>
      </div>
      
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <button onClick={() => navigate("/about")} className="hover:text-primary transition-colors">
          About
        </button>
        <button onClick={() => navigate("/chat")} className="hover:text-primary transition-colors">
          AI Chat
        </button>
        <button onClick={() => navigate("/blog")} className="hover:text-primary transition-colors">
          Blog
        </button>
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-4">
        <a
          href="mailto:hollyman2313@gmail.com"
          className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          aria-label="Email"
        >
          <Mail className="h-4 w-4" />
        </a>
        <a
          href="https://www.instagram.com/broxgit?igsh=MXNyMXFzM3VyNXB6eA=="
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          aria-label="Instagram"
        >
          <Instagram className="h-4 w-4" />
        </a>
      </div>
    </div>
    
    <div className="text-center mt-6 pt-4 border-t border-border text-sm text-muted-foreground">
      © 2025 FitScan • Developed by{" "}
      <a
        href="https://www.instagram.com/broxgit?igsh=MXNyMXFzM3VyNXB6eA=="
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-primary hover:text-primary/80 transition-colors"
      >
        BroxGit
      </a>
    </div>
  </div>
</footer>


export default Index;
