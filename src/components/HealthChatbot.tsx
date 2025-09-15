import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, VolumeX, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function VoiceHealthChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hello! I'm your FitScan Voice Health Assistant. Press and hold the microphone to speak, then release when done. I'll wait for your complete question before responding. What would you like to know about your health?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [recognition, setRecognition] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const silenceTimer = useRef<any>(null);
  const finalTranscript = useRef("");

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        let interimTranscript = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            finalText += transcript;
            finalTranscript.current += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        // Show current transcript (what user is saying)
        setCurrentTranscript(finalTranscript.current + interimTranscript);

        // Reset silence timer on new speech
        if (silenceTimer.current) {
          clearTimeout(silenceTimer.current);
        }

        // Set a timer for silence detection (2 seconds of silence)
        silenceTimer.current = setTimeout(() => {
          if (finalTranscript.current.trim()) {
            processCompleteMessage(finalTranscript.current.trim());
            finalTranscript.current = '';
            setCurrentTranscript('');
          }
        }, 2000); // Wait 2 seconds after user stops speaking
      };

      recognitionInstance.onend = () => {
        // Process any remaining transcript when recognition ends
        if (finalTranscript.current.trim()) {
          processCompleteMessage(finalTranscript.current.trim());
          finalTranscript.current = '';
          setCurrentTranscript('');
        }
        setIsListening(false);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Process complete message after user finishes speaking
  const processCompleteMessage = (completeText: string) => {
    if (!completeText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: completeText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response after a brief delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getHealthResponse(completeText),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      // Speak the response
      speakText(botResponse.text);
    }, 800);
  };

  // Health-specific voice responses for FitScan (same as before)
  const getHealthResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Greetings
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! Welcome to FitScan Health. I can help you choose health assessments and understand symptoms. What can I help you with today?";
    }
    
    // Assessment selection
    if (lowerMessage.includes("which test") || lowerMessage.includes("what assessment") || lowerMessage.includes("choose test")) {
      return "I can help you choose the right assessment! We have Heart Disease Risk Assessment for chest pain, Anxiety Assessment for worry and nervousness, COVID-19 Checker for fever and cough, Asthma Checker for breathing problems, and Diabetes Risk Assessment for increased thirst. What symptoms are you experiencing?";
    }
    
    // Specific conditions
    if (lowerMessage.includes("fever") || lowerMessage.includes("temperature") || lowerMessage.includes("hot")) {
      return "If you have fever, I recommend starting with our COVID-19 Symptom Checker to evaluate fever along with other symptoms like cough, fatigue, or loss of taste. Fever can also indicate other infections, so it's important to get a comprehensive assessment. Would you like me to guide you to the COVID-19 checker?";
    }
    
    if (lowerMessage.includes("chest pain") || lowerMessage.includes("heart") || lowerMessage.includes("cardiac")) {
      return "For chest pain or heart-related symptoms, I recommend our Heart Disease Risk Assessment. It evaluates chest discomfort, shortness of breath, and cardiovascular risk factors. This assessment takes about 8 to 10 minutes. Would you like me to guide you to this test?";
    }
    
    if (lowerMessage.includes("anxiety") || lowerMessage.includes("worry") || lowerMessage.includes("nervous") || lowerMessage.includes("panic")) {
      return "Our Anxiety Assessment can help evaluate worry, nervousness, and anxiety symptoms. It takes 6 to 8 minutes and covers 8 key areas including panic attacks, sleep problems, and concentration issues. This assessment is very helpful for understanding your mental health. Shall I direct you to this assessment?";
    }
    
    if (lowerMessage.includes("covid") || lowerMessage.includes("cough") || lowerMessage.includes("corona")) {
      return "The COVID-19 Symptom Checker evaluates symptoms like fever, cough, loss of taste or smell, fatigue, and breathing difficulties. It helps assess your risk level and provides guidance on testing and isolation. This is especially important if you've been exposed or have symptoms. Would you like to take this assessment?";
    }
    
    if (lowerMessage.includes("breathing") || lowerMessage.includes("asthma") || lowerMessage.includes("wheezing") || lowerMessage.includes("shortness of breath")) {
      return "Our Asthma Symptom Checker is perfect for breathing issues! It evaluates wheezing, persistent cough, chest tightness, and exercise limitations. This assessment can help identify if you might have asthma or other respiratory conditions. It's very thorough and takes about 6 to 8 minutes.";
    }
    
    // Results interpretation
    if (lowerMessage.includes("results") || lowerMessage.includes("score") || lowerMessage.includes("risk level")) {
      return "FitScan results show three risk levels. Low risk means 0 to 39 percent with few symptoms - maintain healthy habits. Moderate risk is 40 to 69 percent with some concerning symptoms - consider medical consultation. High risk is 70 to 100 percent with significant symptoms - seek medical attention promptly. Each result includes personalized recommendations and can be printed as a professional medical report.";
    }
    
    // Emergency situations
    if (lowerMessage.includes("emergency") || lowerMessage.includes("urgent") || lowerMessage.includes("severe pain") || lowerMessage.includes("911")) {
      return "Important! If you're experiencing a medical emergency, call emergency services immediately. That's 911 in the United States. Our assessments are for informational purposes only and cannot replace emergency medical care. For severe symptoms, chest pain, difficulty breathing, or other urgent conditions, seek immediate medical attention.";
    }
    
    // Thank you
    if (lowerMessage.includes("thank")) {
      return "You're very welcome! Your health is important, and I'm glad I could help with voice assistance. If you have any other questions about FitScan assessments or health topics, just speak to me anytime. Take care and stay healthy!";
    }
    
    // Default response
    return "I understand you're asking about health topics. I can help you choose the right health assessment, understand symptoms, or explain how our tests work. For specific medical advice, please consult healthcare professionals. What would you like to know about your health?";
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognition && !isListening) {
      finalTranscript.current = '';
      setCurrentTranscript('');
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      
      // Clear silence timer
      if (silenceTimer.current) {
        clearTimeout(silenceTimer.current);
      }
      
      // Process any final transcript
      if (finalTranscript.current.trim()) {
        processCompleteMessage(finalTranscript.current.trim());
        finalTranscript.current = '';
        setCurrentTranscript('');
      }
      
      setIsListening(false);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const hasVoiceSupport = recognition !== null && 'speechSynthesis' in window;

  return (
    <>
      {/* Floating Voice Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <Mic className="h-6 w-6 text-white" />
          </Button>
        )}

        {/* Voice Chat Window */}
        {isOpen && (
          <div className="w-80 h-96 bg-white shadow-2xl rounded-lg border border-gray-200 flex flex-col">
            {/* Header */}
            <div className="bg-blue-600 text-white rounded-t-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">FitScan Voice Assistant</h3>
                  <p className="text-xs opacity-90">
                    {isListening ? "🎤 Listening..." : isSpeaking ? "🔊 Speaking..." : "Ready • Voice Enabled"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700 h-8 w-8 p-0"
              >
                ✕
              </Button>
            </div>

            {/* Voice Support Check */}
            {!hasVoiceSupport && (
              <div className="p-4 bg-yellow-50 border-b text-center">
                <p className="text-sm text-yellow-800">
                  Voice features require Chrome/Edge browser. Text chat still works!
                </p>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%]`}>
                    {message.isBot && (
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-3 w-3 text-blue-600" />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-lg text-sm leading-relaxed ${
                        message.isBot
                          ? 'bg-white text-gray-800 shadow-sm border border-gray-200'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {message.text}
                      {message.isBot && hasVoiceSupport && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="mt-2 h-6 text-xs p-1"
                          onClick={() => speakText(message.text)}
                        >
                          🔊 Speak
                        </Button>
                      )}
                    </div>
                    {!message.isBot && (
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="h-3 w-3 text-gray-600" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Current Transcript Display */}
              {isListening && currentTranscript && (
                <div className="flex justify-end">
                  <div className="bg-gray-200 p-3 rounded-lg max-w-[85%]">
                    <div className="text-sm text-gray-700">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium">You're saying:</span>
                      </div>
                      "{currentTranscript}"
                    </div>
                  </div>
                </div>
              )}

              {/* Listening Indicator */}
              {isListening && !currentTranscript && (
                <div className="flex justify-center">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Listening... Start speaking</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Voice Controls */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
              <div className="flex justify-center gap-3">
                {hasVoiceSupport && (
                  <>
                    <Button
                      onClick={isListening ? stopListening : startListening}
                      className={`w-12 h-12 rounded-full ${
                        isListening 
                          ? 'bg-red-600 hover:bg-red-700' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                      disabled={isSpeaking}
                    >
                      {isListening ? (
                        <MicOff className="h-6 w-6 text-white" />
                      ) : (
                        <Mic className="h-6 w-6 text-white" />
                      )}
                    </Button>
                    
                    <Button
                      onClick={toggleSpeech}
                      variant="outline"
                      className="w-12 h-12 rounded-full"
                      disabled={!isSpeaking}
                    >
                      {isSpeaking ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                  </>
                )}
              </div>
              
              <div className="text-center mt-2">
                <p className="text-xs text-gray-500">
                  {hasVoiceSupport 
                    ? (isListening ? "Speak now... I'll wait for you to finish" : "Click microphone and speak your complete question") 
                    : "Voice not supported in this browser"
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
