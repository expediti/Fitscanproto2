import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.liveUpdates': 'Live Updates',
    'nav.aiChat': 'AI Chat',
    'nav.signIn': 'Sign In',
    'nav.signOut': 'Sign Out',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.contact': 'Contact',
    
    // Main Page
    'main.aiAssistant': 'AI Health Assistant',
    'main.searchPlaceholder': 'Ask about your health symptoms...',
    'main.quickExamples.chestPain': 'Chest pain',
    'main.quickExamples.headache': 'Headache',
    'main.quickExamples.fever': 'Fever',
    'main.quickExamples.anxiety': 'Anxiety',
    'main.searchTools': 'Search health tools...',
    'main.noToolsFound': 'No tools found matching your criteria.',
    'main.clearFilters': 'Clear Filters',
    
    // Categories
    'category.all': 'All',
    'category.mentalHealth': 'Mental Health',
    'category.respiratory': 'Respiratory',
    'category.infectiousDisease': 'Infectious Disease',
    'category.metabolicHealth': 'Metabolic Health',
    'category.heartHealth': 'Heart Health',
    'category.womensHealth': "Women's Health",
    'category.neurological': 'Neurological',
    'category.digestive': 'Digestive',
    'category.generalHealth': 'General Health',
    
    // Tools
    'tool.anxietyAssessment': 'Anxiety Assessment',
    'tool.anxietyDesc': 'Comprehensive evaluation of anxiety symptoms and their impact on daily life',
    'tool.asthmaChecker': 'Asthma Symptom Checker',
    'tool.asthmaDesc': 'Comprehensive assessment of respiratory symptoms that might indicate asthma',
    'tool.covidChecker': 'COVID-19 Symptom Checker',
    'tool.covidDesc': 'Assessment of symptoms that might indicate COVID-19 infection',
    'tool.diabetesRisk': 'Diabetes Risk Assessment',
    'tool.diabetesDesc': 'Evaluation of risk factors for developing diabetes',
    'tool.depressionAssessment': 'Depression Assessment',
    'tool.depressionDesc': 'Evaluation of depressive symptoms and their impact on daily functioning',
    'tool.heartRisk': 'Heart Disease Risk Assessment',
    'tool.heartDesc': 'Evaluation of cardiovascular health and risk factors',
    'tool.startAssessment': 'Start Assessment',
    'tool.difficulty.easy': 'Easy',
    'tool.difficulty.medium': 'Medium',
    'tool.difficulty.hard': 'Hard',
    
    // Chat
    'chat.title': 'FitScan AI Health Assistant',
    'chat.subtitle': 'Powered by Advanced AI',
    'chat.backToHome': 'Back to Home',
    'chat.howCanHelp': 'How can I help with your health today?',
    'chat.askAbout': 'Ask me about symptoms, medications, treatments, or any health concerns.',
    'chat.inputPlaceholder': 'Ask me about your health...',
    'chat.aiThinking': 'AI is analyzing your question...',
    'chat.disclaimer': 'This AI provides general health information only. Always consult healthcare professionals for medical advice.',
    
    // Footer
    'footer.developedBy': 'Developed by',
    'footer.copyright': '© 2025 FitScan',
    
    // Settings
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.light': 'Light',
    'settings.dark': 'Dark'
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.about': 'के बारे में',
    'nav.blog': 'ब्लॉग',
    'nav.liveUpdates': 'लाइव अपडेट',
    'nav.aiChat': 'AI चैट',
    'nav.signIn': 'साइन इन',
    'nav.signOut': 'साइन आउट',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.profile': 'प्रोफाइल',
    'nav.contact': 'संपर्क',
    
    // Main Page
    'main.aiAssistant': 'AI स्वास्थ्य सहायक',
    'main.searchPlaceholder': 'अपने स्वास्थ्य के लक्षणों के बारे में पूछें...',
    'main.quickExamples.chestPain': 'छाती में दर्द',
    'main.quickExamples.headache': 'सिरदर्द',
    'main.quickExamples.fever': 'बुखार',
    'main.quickExamples.anxiety': 'चिंता',
    'main.searchTools': 'स्वास्थ्य उपकरण खोजें...',
    'main.noToolsFound': 'आपके मानदंडों से मेल खाने वाले कोई उपकरण नहीं मिले।',
    'main.clearFilters': 'फिल्टर साफ करें',
    
    // Categories
    'category.all': 'सभी',
    'category.mentalHealth': 'मानसिक स्वास्थ्य',
    'category.respiratory': 'श्वसन',
    'category.infectiousDisease': 'संक्रामक रोग',
    'category.metabolicHealth': 'चयापचय स्वास्थ्य',
    'category.heartHealth': 'हृदय स्वास्थ्य',
    'category.womensHealth': 'महिला स्वास्थ्य',
    'category.neurological': 'न्यूरोलॉजिकल',
    'category.digestive': 'पाचन',
    'category.generalHealth': 'सामान्य स्वास्थ्य',
    
    // Tools
    'tool.anxietyAssessment': 'चिंता मूल्यांकन',
    'tool.anxietyDesc': 'चिंता के लक्षणों और दैनिक जीवन पर उनके प्रभाव का व्यापक मूल्यांकन',
    'tool.asthmaChecker': 'अस्थमा लक्षण जाँचकर्ता',
    'tool.asthmaDesc': 'श्वसन लक्षणों का व्यापक मूल्यांकन जो अस्थमा का संकेत दे सकते हैं',
    'tool.covidChecker': 'COVID-19 लक्षण जाँचकर्ता',
    'tool.covidDesc': 'उन लक्षणों का मूल्यांकन जो COVID-19 संक्रमण का संकेत दे सकते हैं',
    'tool.diabetesRisk': 'मधुमेह जोखिम मूल्यांकन',
    'tool.diabetesDesc': 'मधुमेह विकसित होने के जोखिम कारकों का मूल्यांकन',
    'tool.depressionAssessment': 'अवसाद मूल्यांकन',
    'tool.depressionDesc': 'अवसादग्रस्त लक्षणों और दैनिक कार्यप्रणाली पर उनके प्रभाव का मूल्यांकन',
    'tool.heartRisk': 'हृदय रोग जोखिम मूल्यांकन',
    'tool.heartDesc': 'हृदय स्वास्थ्य और जोखिम कारकों का मूल्यांकन',
    'tool.startAssessment': 'मूल्यांकन शुरू करें',
    'tool.difficulty.easy': 'आसान',
    'tool.difficulty.medium': 'मध्यम',
    'tool.difficulty.hard': 'कठिन',
    
    // Chat
    'chat.title': 'FitScan AI स्वास्थ्य सहायक',
    'chat.subtitle': 'उन्नत AI द्वारा संचालित',
    'chat.backToHome': 'होम पर वापस जाएं',
    'chat.howCanHelp': 'आज मैं आपके स्वास्थ्य में कैसे मदद कर सकता हूं?',
    'chat.askAbout': 'मुझसे लक्षण, दवाएं, उपचार, या कोई भी स्वास्थ्य चिंता के बारे में पूछें।',
    'chat.inputPlaceholder': 'अपने स्वास्थ्य के बारे में मुझसे पूछें...',
    'chat.aiThinking': 'AI आपके प्रश्न का विश्लेषण कर रहा है...',
    'chat.disclaimer': 'यह AI केवल सामान्य स्वास्थ्य जानकारी प्रदान करता है। चिकित्सा सलाह के लिए हमेशा स्वास्थ्य पेशेवरों से सलाह लें।',
    
    // Footer
    'footer.developedBy': 'द्वारा विकसित',
    'footer.copyright': '© 2025 FitScan',
    
    // Settings
    'settings.language': 'भाषा',
    'settings.theme': 'थीम',
    'settings.light': 'हल्का',
    'settings.dark': 'गहरा'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('fitscan-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('fitscan-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
