import { useState } from "react";
import { Search, ChevronRight, Mail, Instagram, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ToolCard from "@/components/ToolCard";
import SimpleSearchBar from "@/components/SimpleSearchBar.tsx";
import VoiceHealthChatbot from "@/components/HealthChatbot";
import { healthTools, categories } from "@/data/tools";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const filteredTools = healthTools.filter((tool) => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStartTool = (toolId: string) => {
    console.log("Navigating to quiz page for tool:", toolId);
    navigate(`/quiz/${toolId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Navigation />
      
      {/* AI Search Bar - Simple at Top */}
      <section className="py-8 px-4">
        <SimpleSearchBar />
      </section>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Your AI Health
            <span className="text-blue-600 dark:text-blue-400"> Assistant</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Get instant health insights with AI-powered conversations and comprehensive assessments
          </p>
          
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Badge variant="secondary" className="text-sm">
              AI-Powered Conversations
            </Badge>
            <Badge variant="secondary" className="text-sm">
              Smart Health Questions
            </Badge>
            <Badge variant="secondary" className="text-sm">
              Personalized Advice
            </Badge>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="btn-hero px-8 py-3 text-lg"
              onClick={() => navigate('/login')}
            >
              Get Started Free
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-lg"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Health Tools Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Health Assessments
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Choose from our collection of evidence-based health assessment tools
            </p>
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search health tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onStart={() => handleStartTool(tool.id)}
              />
            ))}
          </div>
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No tools found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms or category filter
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Voice Health Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <VoiceHealthChatbot />
      </div>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust FitScan for their health assessments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-3 text-lg text-blue-600"
              onClick={() => navigate('/login')}
            >
              Start Your Assessment
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-8 w-8 text-red-500" />
                <span className="text-2xl font-bold">FitScan</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Your trusted AI-powered health assessment platform. Get personalized insights and professional guidance.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Mail className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Globe className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="text-gray-400 hover:text-white p-0 h-auto justify-start">
                  About Us
                </Button>
                <Button variant="ghost" className="text-gray-400 hover:text-white p-0 h-auto justify-start">
                  Blog
                </Button>
                <Button variant="ghost" className="text-gray-400 hover:text-white p-0 h-auto justify-start">
                  Live Updates
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="text-gray-400 hover:text-white p-0 h-auto justify-start">
                  Help Center
                </Button>
                <Button variant="ghost" className="text-gray-400 hover:text-white p-0 h-auto justify-start">
                  Privacy Policy
                </Button>
                <Button variant="ghost" className="text-gray-400 hover:text-white p-0 h-auto justify-start">
                  Terms of Service
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FitScan. All rights reserved. Made with ❤️ for better health.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
