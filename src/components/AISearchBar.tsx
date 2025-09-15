import { useState, useRef, useEffect } from 'react';
import { Search, Send, Bot, User, Loader2, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AISearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sample health questions for quick access
  const sampleQuestions = [
    "I have chest pain and shortness of breath",
    "What could cause persistent headaches?",
    "I'm feeling anxious and can't sleep",
    "How to improve my heart health?"
  ];

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          conversationHistory: messages.slice(-5),
        }),
      });

      if (!response.ok) throw new Error('Failed to get AI response');
      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast.error('AI is temporarily unavailable. Please try again.');
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setIsExpanded(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast.success('Chat cleared');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* AI Badge */}
      <div className="text-center mb-4">
        <Badge variant="secondary" className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0">
          <Sparkles className="w-4 h-4 mr-2" />
          Powered by GLM-4.5-Flash AI
        </Badge>
      </div>

      {/* Main Search Bar */}
      <div className="relative mb-8">
        <div className="relative group">
          {/* Glowing border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-20 group-hover:opacity-30 blur transition duration-300"></div>
          
          <div className="relative bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 px-6 py-4">
              <Search className="w-6 h-6 text-gray-400 dark:text-gray-500" />
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsExpanded(true)}
                placeholder="Ask me about your health... (e.g., I have chest pain and shortness of breath)"
                className="flex-1 border-0 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 text-lg focus:ring-0 focus-visible:ring-0"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full h-12 w-12 p-0 transition-all duration-200"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      {!isExpanded && (
        <div className="text-center mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Try asking:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {sampleQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickQuestion(question)}
                className="text-sm border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {isExpanded && (
        <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">FitScan AI Health Assistant</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Powered by GLM-4.5-Flash</p>
                </div>
                <div className="ml-auto">
                  <div className="flex items-center gap-1 text-green-500 text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Online
                  </div>
                </div>
              </div>
              {messages.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Messages */}
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-800">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="relative mb-6">
                    <Bot className="w-16 h-16 mx-auto text-blue-500 drop-shadow-lg" />
                    <Sparkles className="w-6 h-6 absolute -top-2 -right-2 text-purple-500" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Advanced AI Health Assistant
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                    Ask me about symptoms, medications, treatments, or any health concerns. I provide personalized medical guidance.
                  </p>
                  <div className="mt-6 flex justify-center space-x-2">
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">Smart Diagnosis</Badge>
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">Medical Advice</Badge>
                    <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">Health Tips</Badge>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isUser && (
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                    
                    <div className={`max-w-[75%] ${message.isUser ? 'order-first' : ''}`}>
                      <div className={`p-4 rounded-2xl shadow-md ${
                        message.isUser 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
                      }`}>
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.text}
                        </div>
                      </div>
                      <p className={`text-xs mt-2 px-2 ${message.isUser ? 'text-gray-500' : 'text-gray-500 dark:text-gray-400'}`}>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    
                    {message.isUser && (
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
              
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl p-4 shadow-md">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Medical Disclaimer */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-yellow-50 dark:bg-yellow-900/20">
              <p className="text-xs text-yellow-800 dark:text-yellow-400 text-center">
                <strong>Medical Disclaimer:</strong> This AI provides general health information only. 
                It is not a substitute for professional medical advice, diagnosis, or treatment. 
                Always consult qualified healthcare professionals for medical concerns.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AISearchBar;
