
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.ask_question': 'Ask Question',
    'nav.wallet': 'Wallet',
    'nav.family_dashboard': 'Family Dashboard',
    
    // Common
    'common.loading': 'Loading...',
    
    // Wallet
    'wallet.stars': 'stars',
    
    // Hero section
    'hero.welcome_back': 'Welcome back',
    'hero.learning_journey': 'Your Learning Journey',
    'hero.continues_here': 'Continues Here',
    'hero.sessions_completed_prefix': 'You\'ve completed',
    'hero.sessions_completed_middle': 'sessions and earned',
    'hero.sessions_completed_suffix': 'stars!',
    'hero.keep_learning': 'Keep learning and growing with Askie!',
    'hero.ask_question': 'Ask a Question',
    'hero.view_progress': 'View Progress',
    
    // Features
    'features.snap_solve': 'Snap & Solve',
    'features.snap_solve_desc': 'Take a photo of any homework question and get instant, detailed explanations.',
    'features.ai_tutor': 'AI Tutor 24/7',
    'features.ai_tutor_desc': 'Get personalized help from our AI tutor, available anytime, anywhere.',
    'features.mobile_money': 'Mobile Money',
    'features.mobile_money_desc': 'Easy payments with MTN, Vodacom, and other African mobile money services.',
    'features.curriculum': 'Local Curriculum',
    'features.curriculum_desc': 'Aligned with South African, Kenyan, Nigerian and other African curricula.',
  },
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.ask_question': 'Fazer Pergunta',
    'nav.wallet': 'Carteira',
    'nav.family_dashboard': 'Painel Familiar',
    
    // Common
    'common.loading': 'Carregando...',
    
    // Wallet
    'wallet.stars': 'estrelas',
    
    // Hero section
    'hero.welcome_back': 'Bem-vindo de volta',
    'hero.learning_journey': 'Sua Jornada de Aprendizado',
    'hero.continues_here': 'Continua Aqui',
    'hero.sessions_completed_prefix': 'Você completou',
    'hero.sessions_completed_middle': 'sessões e ganhou',
    'hero.sessions_completed_suffix': 'estrelas!',
    'hero.keep_learning': 'Continue aprendendo e crescendo com Askie!',
    'hero.ask_question': 'Fazer uma Pergunta',
    'hero.view_progress': 'Ver Progresso',
    
    // Features
    'features.snap_solve': 'Fotografar e Resolver',
    'features.snap_solve_desc': 'Tire uma foto de qualquer questão de lição de casa e obtenha explicações instantâneas e detalhadas.',
    'features.ai_tutor': 'Tutor IA 24/7',
    'features.ai_tutor_desc': 'Obtenha ajuda personalizada do nosso tutor IA, disponível a qualquer hora, em qualquer lugar.',
    'features.mobile_money': 'Dinheiro Móvel',
    'features.mobile_money_desc': 'Pagamentos fáceis com MTN, Vodacom e outros serviços de dinheiro móvel africanos.',
    'features.curriculum': 'Currículo Local',
    'features.curriculum_desc': 'Alinhado com os currículos sul-africano, queniano, nigeriano e outros currículos africanos.',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.ask_question': 'Poser une Question',
    'nav.wallet': 'Portefeuille',
    'nav.family_dashboard': 'Tableau de Bord Familial',
    
    // Common
    'common.loading': 'Chargement...',
    
    // Wallet
    'wallet.stars': 'étoiles',
    
    // Hero section
    'hero.welcome_back': 'Bon retour',
    'hero.learning_journey': 'Votre Parcours d\'Apprentissage',
    'hero.continues_here': 'Continue Ici',
    'hero.sessions_completed_prefix': 'Vous avez complété',
    'hero.sessions_completed_middle': 'sessions et gagné',
    'hero.sessions_completed_suffix': 'étoiles!',
    'hero.keep_learning': 'Continuez à apprendre et à grandir avec Askie!',
    'hero.ask_question': 'Poser une Question',
    'hero.view_progress': 'Voir les Progrès',
    
    // Features
    'features.snap_solve': 'Photographier et Résoudre',
    'features.snap_solve_desc': 'Prenez une photo de n\'importe quelle question de devoir et obtenez des explications instantanées et détaillées.',
    'features.ai_tutor': 'Tuteur IA 24/7',
    'features.ai_tutor_desc': 'Obtenez une aide personnalisée de notre tuteur IA, disponible à tout moment, n\'importe où.',
    'features.mobile_money': 'Argent Mobile',
    'features.mobile_money_desc': 'Paiements faciles avec MTN, Vodacom et autres services d\'argent mobile africains.',
    'features.curriculum': 'Programme Local',
    'features.curriculum_desc': 'Aligné avec les programmes sud-africain, kényan, nigérian et autres programmes africains.',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && translations[savedLanguage as keyof typeof translations]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: string): string => {
    const currentTranslations = translations[currentLanguage as keyof typeof translations] || translations.en;
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
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
