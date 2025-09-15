import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const SimpleSearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/chat?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFocus = () => {
    navigate('/chat');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* AI Badge */}
      <div className="text-center mb-3">
        <Badge variant="secondary" className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200 text-sm">
          <Sparkles className="w-3 h-3 mr-1" />
          Ask anything with AI Mode
        </Badge>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="relative group cursor-pointer" onClick={handleFocus}>
          {/* Subtle glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-30 group-hover:opacity-50 transition duration-300 blur"></div>
          
          <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 px-5 py-3">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={handleFocus}
                placeholder="Ask me about your health... (e.g., I have chest pain and shortness of breath)"
                className="flex-1 border-0 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:ring-0 focus-visible:ring-0 cursor-pointer"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleSearchBar;
