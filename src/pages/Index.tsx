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

  const handleAISearch = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* PROMINENT AI SEARCH BAR - FORCED TO SHOW */}
      <div 
        style={{
          backgroundColor: '#f8fafc',
          padding: '32px 16px',
          borderBottom: '1px solid #e2e8f0',
          position: 'relative',
          zIndex: 10,
          display: 'block'
        }}
      >
        <div style={{ maxWidth: '1024px', margin: '0 auto', textAlign: 'center' }}>
          {/* AI Badge */}
          <div style={{ marginBottom: '16px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#dbeafe',
              color: '#1d4ed8',
              padding: '8px 16px',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              border: '1px solid #bfdbfe'
            }}>
              ✨ Ask Your Health Questions with AI
            </span>
          </div>

          {/* Big Prominent Search Bar */}
          <div 
            style={{
              backgroundColor: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: '50px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              maxWidth: '700px',
              margin: '0 auto'
            }}
            onClick={handleAISearch}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(59, 130, 246, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              padding: '20px 28px'
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                color: '#6b7280',
                flexShrink: 0
              }}>
                🔍
              </div>
              
              <div style={{
                flex: 1,
                textAlign: 'left',
                color: '#6b7280',
                fontSize: '18px',
                fontWeight: '400'
              }}>
                Ask me about your health... (e.g., I have chest pain and shortness of breath)
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                cursor: 'pointer'
              }}>
                <span style={{ color: 'white', fontSize: '20px' }}>✨</span>
              </div>
            </div>
          </div>

          {/* Powered by */}
          <div style={{ 
            marginTop: '12px',
            color: '#6b7280',
            fontSize: '13px',
            fontWeight: '500'
          }}>
            Powered by GLM-4.5-Flash AI • Free Health Assistant
          </div>
        </div>
      </div>

      {/* Your Existing Tools Section */}
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
              {categories.map((category) => (
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

      {/* Simple CTA Section */}
      <section className="py-12 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg mb-6 text-muted-foreground">
            Join thousands of users who trust FitScan for their health assessments
          </p>
          <Button size="lg" className="text-primary-foreground">
            Get Started Today
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
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
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>www.fitscan.life</span>
                </div>
              </div>
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
                    onClick={() => navigate("/blog")}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <span className="text-muted-foreground">Privacy Policy</span>
                </li>
                <li>
                  <span className="text-muted-foreground">Terms of Service</span>
                </li>
              </ul>
            </div>
            {/* Contact & Developer Info */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Contact & Support</h3>
              <div className="space-y-4">
                {/* Email Contact */}
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email Us</p>
                    <a
                      href="mailto:hollyman2313@gmail.com"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      hollyman2313@gmail.com
                    </a>
                  </div>
                </div>
                {/* Instagram Contact */}
                <div className="flex items-center gap-3">
                  <Instagram className="h-4 w-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Follow Us</p>
                    <a
                      href="https://www.instagram.com/broxgit?igsh=MXNyMXFzM3VyNXB6eA=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      @broxgit
                    </a>
                  </div>
                </div>
                {/* Developer Credit */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">Developed by</p>
                  <a
                    href="https://www.instagram.com/broxgit?igsh=MXNyMXFzM3VyNXB6eA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    BroxGit
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Bar */}
          <div className="border-t border-border mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>© {new Date().getFullYear()} FitScan Health Assessment Platform</span>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">All rights reserved</span>
              </div>
              <div className="flex items-center gap-4">
                {/* Social Links */}
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
            {/* Developer Attribution */}
            <div className="text-center mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Crafted with <Heart className="h-3 w-3 inline text-red-500 mx-1" /> by{" "}
                <a
                  href="https://www.instagram.com/broxgit?igsh=MXNyMXFzM3VyNXB6eA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  BroxGit
                </a>
                {" "}- Your trusted developer for innovative health solutions
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Voice Health Chatbot - Floating Widget */}
      <VoiceHealthChatbot />
    </div>
  );
};

export default Index;
