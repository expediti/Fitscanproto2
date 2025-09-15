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
      
      {/* AI SEARCH BAR - SHOWS FOR EVERYONE */}
      <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* AI Badge */}
          <div className="mb-6">
            <Badge className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold">
              🤖 AI Health Assistant - Ask Anything
            </Badge>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Your AI Health Assistant
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get instant health insights with AI-powered conversations and comprehensive assessments
          </p>

          {/* PROMINENT SEARCH BAR */}
          <div 
            className="max-w-4xl mx-auto mb-8 cursor-pointer group"
            onClick={handleAISearch}
          >
            <div className="relative">
              {/* Search Bar */}
              <div className="relative bg-white dark:bg-gray-800 rounded-full shadow-2xl border-2 border-blue-200 dark:border-blue-800 group-hover:border-blue-400 dark:group-hover:border-blue-600 transition-all duration-300">
                <div className="flex items-center gap-6 px-8 py-6">
                  <Search className="w-7 h-7 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                  
                  <div className="flex-1 text-left text-gray-500 dark:text-gray-400 text-xl font-medium">
                    Ask me about your health... (e.g., I have chest pain and shortness of breath)
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full h-14 w-14 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0 shadow-lg">
                    <span className="text-xl">✨</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center justify-center gap-2">
              <span className="text-green-500">AI-Powered Conversations</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-blue-500">Smart Health Questions</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-purple-500">Personalized Advice</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              size="lg" 
              onClick={handleAISearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-gray-300 hover:border-blue-600 px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search health tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categoriesToUse.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 text-foreground"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Tools Grid */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">No tools found matching your criteria.</div>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">FitScan</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                Your trusted health assessment platform providing accurate, AI-powered symptom checkers
                and diagnostic tools for better health decisions.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/about")}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/chat")}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    AI Chat
                  </button>
                </li>
              </ul>
            </div>
            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:hollyman2313@gmail.com" className="text-muted-foreground hover:text-primary">
                    hollyman2313@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Instagram className="h-4 w-4 text-primary" />
                  <a href="https://www.instagram.com/broxgit" target="_blank" className="text-muted-foreground hover:text-primary">
                    @broxgit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <VoiceHealthChatbot />
    </div>
  );
};

export default Index;
