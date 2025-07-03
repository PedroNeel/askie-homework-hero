
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (languageCode: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary - in a real app, this would come from translation files
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.ask_question': 'Ask Question',
    'nav.wallet': 'Wallet',
    'nav.family_dashboard': 'Family Dashboard',
    'nav.sign_out': 'Sign Out',
    
    // Hero section
    'hero.welcome_back': 'Welcome back',
    'hero.learning_journey': 'Your Learning Journey',
    'hero.continues_here': 'Continues Here',
    'hero.sessions_completed': 'You\'ve completed {count} homework sessions and earned {stars} family stars!',
    'hero.keep_learning': 'Keep learning and exploring with Askie.',
    'hero.ask_question': 'Ask a Question',
    'hero.view_progress': 'View Progress',
    
    // Auth
    'auth.welcome': 'Welcome to Askie',
    'auth.ai_assistant': 'Your AI homework assistant',
    'auth.sign_in': 'Sign In',
    'auth.sign_up': 'Sign Up',
    'auth.email': 'Email address',
    'auth.password': 'Password',
    'auth.full_name': 'Full name',
    'auth.confirm_password': 'Confirm password',
    'auth.signing_in': 'Signing in...',
    'auth.creating_account': 'Creating account...',
    'auth.create_account': 'Create Account',
    'auth.getting_started': 'Getting Started',
    'auth.sign_up_benefits': 'Sign up to save your homework sessions, track your progress, and manage your wallet balance.',
    'auth.verify_email': 'Please check your email and click the verification link before signing in.',
    'auth.account_created': 'Account created successfully! Please check your email to verify your account before signing in.',
    
    // Language selector
    'language.choose': 'Choose Your Language',
    'language.search': 'Search languages...',
    'language.currently_selected': 'Currently selected',
    'language.available': 'Available Languages',
    'language.supporting': 'Supporting 80+ African languages for better learning',
    
    // Wallet
    'wallet.balance': 'Balance',
    'wallet.stars': 'Stars',
    'wallet.fund_wallet': 'Fund Your Wallet',
    
    // Features
    'features.snap_solve': 'Snap & Solve',
    'features.snap_solve_desc': 'Take a photo of any homework question and get instant, step-by-step explanations',
    'features.ai_tutor': 'AI Tutor Chat',
    'features.ai_tutor_desc': 'Ask questions in text or voice - supports multiple African languages',
    'features.mobile_money': 'Mobile Money',
    'features.mobile_money_desc': 'Pay seamlessly with M-Pesa, MTN MoMo, or Flutterwave - micro-payments from R2',
    'features.curriculum': 'Curriculum Aligned',
    'features.curriculum_desc': 'Answers tailored to CAPS, WAEC, and local African curricula',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
  },
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.ask_question': 'Fazer Pergunta',
    'nav.wallet': 'Carteira',
    'nav.family_dashboard': 'Painel da Família',
    'nav.sign_out': 'Sair',
    
    // Hero section
    'hero.welcome_back': 'Bem-vindo de volta',
    'hero.learning_journey': 'Sua Jornada de Aprendizado',
    'hero.continues_here': 'Continua Aqui',
    'hero.sessions_completed': 'Você completou {count} sessões de trabalho de casa e ganhou {stars} estrelas da família!',
    'hero.keep_learning': 'Continue aprendendo e explorando com Askie.',
    'hero.ask_question': 'Fazer uma Pergunta',
    'hero.view_progress': 'Ver Progresso',
    
    // Auth
    'auth.welcome': 'Bem-vindo ao Askie',
    'auth.ai_assistant': 'Seu assistente de IA para trabalhos de casa',
    'auth.sign_in': 'Entrar',
    'auth.sign_up': 'Cadastrar',
    'auth.email': 'Endereço de e-mail',
    'auth.password': 'Senha',
    'auth.full_name': 'Nome completo',
    'auth.confirm_password': 'Confirmar senha',
    'auth.signing_in': 'Entrando...',
    'auth.creating_account': 'Criando conta...',
    'auth.create_account': 'Criar Conta',
    'auth.getting_started': 'Começando',
    'auth.sign_up_benefits': 'Cadastre-se para salvar suas sessões de trabalho de casa, acompanhar seu progresso e gerenciar o saldo da sua carteira.',
    'auth.verify_email': 'Verifique seu e-mail e clique no link de verificação antes de fazer login.',
    'auth.account_created': 'Conta criada com sucesso! Verifique seu e-mail para verificar sua conta antes de fazer login.',
    
    // Language selector
    'language.choose': 'Escolha Seu Idioma',
    'language.search': 'Pesquisar idiomas...',
    'language.currently_selected': 'Atualmente selecionado',
    'language.available': 'Idiomas Disponíveis',
    'language.supporting': 'Suportando mais de 80 idiomas africanos para melhor aprendizado',
    
    // Wallet
    'wallet.balance': 'Saldo',
    'wallet.stars': 'Estrelas',
    'wallet.fund_wallet': 'Financiar Carteira',
    
    // Features
    'features.snap_solve': 'Fotografar e Resolver',
    'features.snap_solve_desc': 'Tire uma foto de qualquer pergunta de trabalho de casa e obtenha explicações instantâneas passo a passo',
    'features.ai_tutor': 'Chat do Tutor IA',
    'features.ai_tutor_desc': 'Faça perguntas em texto ou voz - suporta vários idiomas africanos',
    'features.mobile_money': 'Dinheiro Móvel',
    'features.mobile_money_desc': 'Pague facilmente com M-Pesa, MTN MoMo ou Flutterwave - micropagamentos a partir de R2',
    'features.curriculum': 'Alinhado ao Currículo',
    'features.curriculum_desc': 'Respostas adaptadas aos currículos CAPS, WAEC e africanos locais',
    
    // Common
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.ask_question': 'Poser une Question',
    'nav.wallet': 'Portefeuille',
    'nav.family_dashboard': 'Tableau de Bord Familial',
    'nav.sign_out': 'Se Déconnecter',
    
    // Hero section
    'hero.welcome_back': 'Bon retour',
    'hero.learning_journey': 'Votre Parcours d\'Apprentissage',
    'hero.continues_here': 'Continue Ici',
    'hero.sessions_completed': 'Vous avez terminé {count} sessions de devoirs et gagné {stars} étoiles familiales!',
    'hero.keep_learning': 'Continuez à apprendre et à explorer avec Askie.',
    'hero.ask_question': 'Poser une Question',
    'hero.view_progress': 'Voir les Progrès',
    
    // Auth
    'auth.welcome': 'Bienvenue chez Askie',
    'auth.ai_assistant': 'Votre assistant IA pour les devoirs',
    'auth.sign_in': 'Se Connecter',
    'auth.sign_up': 'S\'Inscrire',
    'auth.email': 'Adresse e-mail',
    'auth.password': 'Mot de passe',
    'auth.full_name': 'Nom complet',
    'auth.confirm_password': 'Confirmer le mot de passe',
    'auth.signing_in': 'Connexion...',
    'auth.creating_account': 'Création du compte...',
    'auth.create_account': 'Créer un Compte',
    'auth.getting_started': 'Commencer',
    'auth.sign_up_benefits': 'Inscrivez-vous pour sauvegarder vos sessions de devoirs, suivre vos progrès et gérer le solde de votre portefeuille.',
    'auth.verify_email': 'Veuillez vérifier votre e-mail et cliquer sur le lien de vérification avant de vous connecter.',
    'auth.account_created': 'Compte créé avec succès! Veuillez vérifier votre e-mail pour vérifier votre compte avant de vous connecter.',
    
    // Language selector
    'language.choose': 'Choisissez Votre Langue',
    'language.search': 'Rechercher des langues...',
    'language.currently_selected': 'Actuellement sélectionné',
    'language.available': 'Langues Disponibles',
    'language.supporting': 'Prenant en charge plus de 80 langues africaines pour un meilleur apprentissage',
    
    // Wallet
    'wallet.balance': 'Solde',
    'wallet.stars': 'Étoiles',
    'wallet.fund_wallet': 'Alimenter le Portefeuille',
    
    // Features
    'features.snap_solve': 'Photographier et Résoudre',
    'features.snap_solve_desc': 'Prenez une photo de n\'importe quelle question de devoir et obtenez des explications instantanées étape par étape',
    'features.ai_tutor': 'Chat Tuteur IA',
    'features.ai_tutor_desc': 'Posez des questions en texte ou en voix - prend en charge plusieurs langues africaines',
    'features.mobile_money': 'Argent Mobile',
    'features.mobile_money_desc': 'Payez facilement avec M-Pesa, MTN MoMo ou Flutterwave - micropaiements à partir de R2',
    'features.curriculum': 'Aligné sur le Programme',
    'features.curriculum_desc': 'Réponses adaptées aux programmes CAPS, WAEC et africains locaux',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('preferred-language', languageCode);
  };

  const t = (key: string, params?: Record<string, string | number>) => {
    const translation = translations[currentLanguage]?.[key] || translations['en'][key] || key;
    
    if (params) {
      return Object.entries(params).reduce(
        (acc, [paramKey, paramValue]) =>
          acc.replace(`{${paramKey}}`, String(paramValue)),
        translation
      );
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
