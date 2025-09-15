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
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.liveUpdates': 'Live Updates',
    'nav.aiChat': 'AI Chat',
    'nav.signIn': 'Sign In',
    'nav.signOut': 'Sign out',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'main.aiAssistant': 'AI Health Assistant',
    'main.searchPlaceholder': 'Ask about your health symptoms...',
    'main.quickExamples.chestPain': 'Chest pain',
    'main.quickExamples.headache': 'Headache',
    'main.quickExamples.fever': 'Fever',
    'main.quickExamples.anxiety': 'Anxiety',
    'main.searchTools': 'Search health tools...',
    'main.noToolsFound': 'No tools found matching your criteria.',
    'main.clearFilters': 'Clear Filters',
    'category.all': 'All',
    'category.mentalHealth': 'Mental Health',
    'category.respiratory': 'Respiratory',
    'category.infectiousDisease': 'Infectious Disease',
    'category.metabolicHealth': 'Metabolic Health',
    'category.heartHealth': 'Heart Health',
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
    'tool.difficulty.easy': 'Easy',
    'tool.difficulty.medium': 'Medium',
    'footer.developedBy': 'Developed by'
  },
  hi: {
    'nav.home': 'होम',
    'nav.about': 'के बारे में',
    'nav.blog': 'ब्लॉग',
    'nav.liveUpdates': 'लाइव अपडेट',
    'nav.aiChat': 'AI चैट',
    'nav.signIn': 'साइन इन',
    'nav.signOut': 'साइन आउट',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.profile': 'प्रोफाइल',
    'main.aiAssistant': 'AI स्वास्थ्य सहायक',
    'main.searchPlaceholder': 'अपने स्वास्थ्य के लक्षणों के बारे में पूछें...',
    'main.quickExamples.chestPain': 'छाती में दर्द',
    'main.quickExamples.headache': 'सिरदर्द',
    'main.quickExamples.fever': 'बुखार',
    'main.quickExamples.anxiety': 'चिंता',
    'main.searchTools': 'स्वास्थ्य उपकरण खोजें...',
    'main.noToolsFound': 'आपके मानदंडों से मेल खाने वाले कोई उपकरण नहीं मिले।',
    'main.clearFilters': 'फिल्टर साफ करें',
    'category.all': 'सभी',
    'category.mentalHealth': 'मानसिक स्वास्थ्य',
    'category.respiratory': 'श्वसन',
    'category.infectiousDisease': 'संक्रामक रोग',
    'category.metabolicHealth': 'चयापचय स्वास्थ्य',
    'category.heartHealth': 'हृदय स्वास्थ्य',
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
    'tool.difficulty.easy': 'आसान',
    'tool.difficulty.medium': 'मध्यम',
    'footer.developedBy': 'द्वारा विकसित'
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
