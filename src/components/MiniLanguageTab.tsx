
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "sw", name: "Swahili", flag: "🇰🇪" },
  { code: "yo", name: "Yoruba", flag: "🇳🇬" },
  { code: "af", name: "Afrikaans", flag: "🇿🇦" }
];

const MiniLanguageTab = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode);
    const selectedLang = languages.find(lang => lang.code === languageCode);
    toast.success(`Language changed to ${selectedLang?.name} ${selectedLang?.flag}`);
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="w-4 h-4" />
          <span className="text-lg">{currentLang.flag}</span>
          <span className="hidden sm:inline">{currentLang.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="text-lg">{language.flag}</span>
            <span className="flex-1">{language.name}</span>
            {currentLanguage === language.code && (
              <Check className="w-4 h-4 text-purple-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MiniLanguageTab;
