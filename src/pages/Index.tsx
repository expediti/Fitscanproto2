import { useState } from "react";
import { Search, ChevronRight, Mail, Instagram, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import ToolCard from "@/components/ToolCard";
import VoiceHealthChatbot from "@/components/HealthChatbot";
import { healthTools, categories } from "@/data/tools";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Mock health tools with translations
  const defaultTools = [
    {
      id: "anxiety-assessment",
      title: t('tool.anxietyAssessment'),
      description: t('tool.anxietyDesc'),
      category: t('category.mentalHealth'),
      difficulty: t('tool.difficulty.easy'),
      estimatedTime: "6-8 min",
      icon: "🧠"
    },
    {
      id: "asthma-checker",
      title: t('tool.asthmaChecker'), 
      description: t('tool.asthmaDesc'),
      category: t('category.respiratory'),
      difficulty: t('tool.difficulty.easy'), 
      estimatedTime: "6-8 min",
      icon: "🫁"
    },
    {
      id: "covid-checker",
      title: t('tool.covidChecker'),
      description: t('tool.covidDesc'),
      category: t('category.infectiousDisease'),
      difficulty: t('tool.difficulty.easy'),
      estimatedTime: "5-7 min", 
      icon: "🦠"
    },
    {
      id: "diabetes-risk",
      title: t('tool.diabetesRisk'),
      description: t('tool.diabetesDesc'),
      category: t('category.metabolicHealth'),
      difficulty: t('tool.difficulty.easy'),
      estimatedTime: "6-8 min",
      icon: "🩺"
    },
    {
      id: "depression-assessment", 
      title: t('tool.depressionAssessment'),
      description: t('tool.depressionDesc'),
      category: t('category.mentalHealth'),
      difficulty: t('tool.difficulty.easy'),
      estimatedTime: "7-9 min",
      icon: "💭"
    },
    {
      id: "heart-risk",
      title: t('tool.heartRisk'), 
      description: t('tool.heartDesc'),
      category: t('category.heartHealth'),
      difficulty: t('tool.difficulty.medium'),
      estimatedTime: "8-10 min",
      icon: "❤️"
    }
  ];

  // Use imported tools or fallback to default
  const toolsToUse = healthTools && healthTools.length > 0 ? healthTools : defaultTools;
  const categoriesToUse = categories && categories.length > 0 ? categories : 
    [t('category.all'), t('category.mentalHealth'), t('category.respiratory'), t('category.infectiousDisease'), t('category.metabolicHealth'), t('category.heartHealth')];

  const filteredTools = toolsToUse.filter((tool) => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === t('category.all') || tool.category === selectedCategory;
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
              🤖 {t('main.aiAssistant')}
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
                  {t('main.searchPlaceholder')}
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
              t('main.quickExamples.chestPain'),
              t('main.quickExamples.headache'), 
              t('main.quickExamples.fever'),
              t('main.quickExamples.anxiety')
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
                placeholder={t('main.searchTools')}
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
              <div className="text-muted-foreground mb-4 text-sm">{t('main.noToolsFound')}</div>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(t('category.all'));
                }}
                variant="outline"
                size="sm"
              >
                {t('main.clearFilters')}
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
                {t('nav.about')}
              </button>
              <button onClick={() => navigate("/chat")} className="hover:text-primary transition-colors">
                {t('nav.aiChat')}
              </button>
              <button onClick={() => navigate("/blog")} className="hover:text-primary transition-colors">
                {t('nav.blog')}
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
            © 2025 FitScan • {t('footer.developedBy')}{" "}
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

      <VoiceHealthChatbot />
    </div>
  );
};

export default Index;
