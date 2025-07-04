
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
    
    // Auth
    'auth.welcome': 'Welcome',
    'auth.ai_assistant': 'AI Assistant',
    'auth.sign_in': 'Sign In',
    'auth.sign_up': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.getting_started': 'Getting Started',
    'auth.sign_up_benefits': 'Sign up to unlock premium features',
    'auth.check_email': 'Please check your email for a verification link before signing in',
    'auth.already_have_account': 'Already have an account?',
    'auth.dont_have_account': "Don't have an account?",
    
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
    
    // Homework
    'homework.title': 'Ask Askie Anything!',
    'homework.subtitle': 'Snap a photo or type your homework question',
    'homework.your_question': 'Your Question',
    'homework.type_question': 'Type your homework question here... (supports English, Afrikaans, Swahili, Yoruba, and more!)',
    'homework.upload_photo': 'Click to upload homework photo',
    'homework.supports_handwritten': 'Supports handwritten and printed questions',
    'homework.choose_level': 'Choose Your Answer Level',
    'homework.quick_hint': 'Quick Hint',
    'homework.quick_hint_desc': 'Fast pointer in the right direction',
    'homework.full_walkthrough': 'Full Walkthrough',
    'homework.full_walkthrough_desc': 'Complete step-by-step solution',
    'homework.try_yourself': 'Try It Yourself',
    'homework.try_yourself_desc': 'Solution + similar practice questions',
    'homework.get_hint': 'Get Quick Hint',
    'homework.get_walkthrough': 'Get Full Walkthrough',
    'homework.get_practice': 'Get Try It Yourself',
    'homework.processing': 'Processing...',
    'homework.balance': 'Balance',
  },
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.ask_question': 'Fazer Pergunta',
    'nav.wallet': 'Carteira',
    'nav.family_dashboard': 'Painel Familiar',
    
    // Common
    'common.loading': 'Carregando...',
    
    // Auth
    'auth.welcome': 'Bem-vindo',
    'auth.ai_assistant': 'Assistente IA',
    'auth.sign_in': 'Entrar',
    'auth.sign_up': 'Cadastrar',
    'auth.email': 'Email',
    'auth.password': 'Senha',
    'auth.getting_started': 'Começando',
    'auth.sign_up_benefits': 'Cadastre-se para desbloquear recursos premium',
    'auth.check_email': 'Por favor, verifique seu email para um link de verificação antes de fazer login',
    'auth.already_have_account': 'Já tem uma conta?',
    'auth.dont_have_account': 'Não tem uma conta?',
    
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
    
    // Homework
    'homework.title': 'Pergunte Qualquer Coisa ao Askie!',
    'homework.subtitle': 'Tire uma foto ou digite sua pergunta de lição de casa',
    'homework.your_question': 'Sua Pergunta',
    'homework.type_question': 'Digite sua pergunta de lição de casa aqui... (suporta português, inglês, africâner, suaíli, iorubá e mais!)',
    'homework.upload_photo': 'Clique para fazer upload da foto da lição de casa',
    'homework.supports_handwritten': 'Suporta questões manuscritas e impressas',
    'homework.choose_level': 'Escolha o Nível da sua Resposta',
    'homework.quick_hint': 'Dica Rápida',
    'homework.quick_hint_desc': 'Orientação rápida na direção certa',
    'homework.full_walkthrough': 'Explicação Completa',
    'homework.full_walkthrough_desc': 'Solução completa passo a passo',
    'homework.try_yourself': 'Tente Você Mesmo',
    'homework.try_yourself_desc': 'Solução + questões de prática similares',
    'homework.get_hint': 'Obter Dica Rápida',
    'homework.get_walkthrough': 'Obter Explicação Completa',
    'homework.get_practice': 'Obter Tente Você Mesmo',
    'homework.processing': 'Processando...',
    'homework.balance': 'Saldo',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.ask_question': 'Poser une Question',
    'nav.wallet': 'Portefeuille',
    'nav.family_dashboard': 'Tableau de Bord Familial',
    
    // Common
    'common.loading': 'Chargement...',
    
    // Auth
    'auth.welcome': 'Bienvenue',
    'auth.ai_assistant': 'Assistant IA',
    'auth.sign_in': 'Se Connecter',
    'auth.sign_up': 'S\'inscrire',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.getting_started': 'Commencer',
    'auth.sign_up_benefits': 'Inscrivez-vous pour débloquer les fonctionnalités premium',
    'auth.check_email': 'Veuillez vérifier votre email pour un lien de vérification avant de vous connecter',
    'auth.already_have_account': 'Vous avez déjà un compte?',
    'auth.dont_have_account': 'Vous n\'avez pas de compte?',
    
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
    
    // Homework
    'homework.title': 'Demandez N\'importe Quoi à Askie!',
    'homework.subtitle': 'Prenez une photo ou tapez votre question de devoir',
    'homework.your_question': 'Votre Question',
    'homework.type_question': 'Tapez votre question de devoir ici... (supporte le français, anglais, afrikaans, swahili, yoruba et plus!)',
    'homework.upload_photo': 'Cliquez pour télécharger une photo de devoir',
    'homework.supports_handwritten': 'Supporte les questions manuscrites et imprimées',
    'homework.choose_level': 'Choisissez Votre Niveau de Réponse',
    'homework.quick_hint': 'Indice Rapide',
    'homework.quick_hint_desc': 'Pointeur rapide dans la bonne direction',
    'homework.full_walkthrough': 'Explication Complète',
    'homework.full_walkthrough_desc': 'Solution complète étape par étape',
    'homework.try_yourself': 'Essayez Vous-même',
    'homework.try_yourself_desc': 'Solution + questions de pratique similaires',
    'homework.get_hint': 'Obtenir Indice Rapide',
    'homework.get_walkthrough': 'Obtenir Explication Complète',
    'homework.get_practice': 'Obtenir Essayez Vous-même',
    'homework.processing': 'Traitement...',
    'homework.balance': 'Solde',
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
