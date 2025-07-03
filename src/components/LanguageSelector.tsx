
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe, Check } from "lucide-react";
import { toast } from "sonner";

const africanLanguages = [
  { code: "af", name: "Afrikaans", country: "🇿🇦" },
  { code: "am", name: "Amharic", country: "🇪🇹" },
  { code: "ar", name: "Arabic", country: "🌍" },
  { code: "bm", name: "Bambara", country: "🇲🇱" },
  { code: "be", name: "Bemba", country: "🇿🇲" },
  { code: "bn", name: "Berber", country: "🇲🇦" },
  { code: "bi", name: "Bislama", country: "🇻🇺" },
  { code: "ny", name: "Chichewa", country: "🇲🇼" },
  { code: "dv", name: "Divehi", country: "🇲🇻" },
  { code: "dz", name: "Dzongkha", country: "🇧🇹" },
  { code: "en", name: "English", country: "🌍" },
  { code: "fr", name: "French", country: "🌍" },
  { code: "ff", name: "Fulani", country: "🇳🇬" },
  { code: "lg", name: "Ganda", country: "🇺🇬" },
  { code: "ka", name: "Georgian", country: "🇬🇪" },
  { code: "ha", name: "Hausa", country: "🇳🇬" },
  { code: "he", name: "Hebrew", country: "🇮🇱" },
  { code: "ig", name: "Igbo", country: "🇳🇬" },
  { code: "ki", name: "Kikuyu", country: "🇰🇪" },
  { code: "rw", name: "Kinyarwanda", country: "🇷🇼" },
  { code: "sw", name: "Kiswahili", country: "🇰🇪" },
  { code: "ko", name: "Kongo", country: "🇨🇩" },
  { code: "kj", name: "Kuanyama", country: "🇳🇦" },
  { code: "ky", name: "Kyrgyz", country: "🇰🇬" },
  { code: "ln", name: "Lingala", country: "🇨🇩" },
  { code: "lu", name: "Luba-Katanga", country: "🇨🇩" },
  { code: "lb", name: "Luxembourgish", country: "🇱🇺" },
  { code: "mg", name: "Malagasy", country: "🇲🇬" },
  { code: "ms", name: "Malay", country: "🇲🇾" },
  { code: "ml", name: "Malayalam", country: "🇮🇳" },
  { code: "mt", name: "Maltese", country: "🇲🇹" },
  { code: "mi", name: "Maori", country: "🇳🇿" },
  { code: "mr", name: "Marathi", country: "🇮🇳" },
  { code: "mh", name: "Marshallese", country: "🇲🇭" },
  { code: "mn", name: "Mongolian", country: "🇲🇳" },
  { code: "na", name: "Nauru", country: "🇳🇷" },
  { code: "nv", name: "Navajo", country: "🇺🇸" },
  { code: "nd", name: "Ndebele", country: "🇿🇼" },
  { code: "ne", name: "Nepali", country: "🇳🇵" },
  { code: "ng", name: "Ndonga", country: "🇳🇦" },
  { code: "nb", name: "Norwegian", country: "🇳🇴" },
  { code: "nn", name: "Norwegian Nynorsk", country: "🇳🇴" },
  { code: "oc", name: "Occitan", country: "🇫🇷" },
  { code: "oj", name: "Ojibwe", country: "🇨🇦" },
  { code: "cu", name: "Old Church Slavonic", country: "🌍" },
  { code: "om", name: "Oromo", country: "🇪🇹" },
  { code: "os", name: "Ossetian", country: "🇷🇺" },
  { code: "pi", name: "Pali", country: "🇮🇳" },
  { code: "fa", name: "Persian", country: "🇮🇷" },
  { code: "pl", name: "Polish", country: "🇵🇱" },
  { code: "ps", name: "Pashto", country: "🇦🇫" },
  { code: "pt", name: "Portuguese", country: "🇵🇹" },
  { code: "qu", name: "Quechua", country: "🇵🇪" },
  { code: "rm", name: "Romansh", country: "🇨🇭" },
  { code: "rn", name: "Kirundi", country: "🇧🇮" },
  { code: "ro", name: "Romanian", country: "🇷🇴" },
  { code: "ru", name: "Russian", country: "🇷🇺" },
  { code: "sa", name: "Sanskrit", country: "🇮🇳" },
  { code: "sc", name: "Sardinian", country: "🇮🇹" },
  { code: "sd", name: "Sindhi", country: "🇵🇰" },
  { code: "se", name: "Northern Sami", country: "🇳🇴" },
  { code: "sm", name: "Samoan", country: "🇼🇸" },
  { code: "sg", name: "Sango", country: "🇨🇫" },
  { code: "sr", name: "Serbian", country: "🇷🇸" },
  { code: "gd", name: "Scottish Gaelic", country: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { code: "sn", name: "Shona", country: "🇿🇼" },
  { code: "si", name: "Sinhala", country: "🇱🇰" },
  { code: "sk", name: "Slovak", country: "🇸🇰" },
  { code: "sl", name: "Slovenian", country: "🇸🇮" },
  { code: "so", name: "Somali", country: "🇸🇴" },
  { code: "st", name: "Southern Sotho", country: "🇱🇸" },
  { code: "es", name: "Spanish", country: "🇪🇸" },
  { code: "su", name: "Sundanese", country: "🇮🇩" },
  { code: "sw", name: "Swahili", country: "🇹🇿" },
  { code: "ss", name: "Swati", country: "🇸🇿" },
  { code: "sv", name: "Swedish", country: "🇸🇪" },
  { code: "ta", name: "Tamil", country: "🇮🇳" },
  { code: "te", name: "Telugu", country: "🇮🇳" },
  { code: "tg", name: "Tajik", country: "🇹🇯" },
  { code: "th", name: "Thai", country: "🇹🇭" },
  { code: "ti", name: "Tigrinya", country: "🇪🇷" },
  { code: "bo", name: "Tibetan", country: "🇨🇳" },
  { code: "tk", name: "Turkmen", country: "🇹🇲" },
  { code: "tl", name: "Tagalog", country: "🇵🇭" },
  { code: "tn", name: "Tswana", country: "🇧🇼" },
  { code: "to", name: "Tonga", country: "🇹🇴" },
  { code: "tr", name: "Turkish", country: "🇹🇷" },
  { code: "ts", name: "Tsonga", country: "🇿🇦" },
  { code: "tt", name: "Tatar", country: "🇷🇺" },
  { code: "tw", name: "Twi", country: "🇬🇭" },
  { code: "ty", name: "Tahitian", country: "🇵🇫" },
  { code: "ug", name: "Uighur", country: "🇨🇳" },
  { code: "uk", name: "Ukrainian", country: "🇺🇦" },
  { code: "ur", name: "Urdu", country: "🇵🇰" },
  { code: "uz", name: "Uzbek", country: "🇺🇿" },
  { code: "ve", name: "Venda", country: "🇿🇦" },
  { code: "vi", name: "Vietnamese", country: "🇻🇳" },
  { code: "vo", name: "Volapük", country: "🌍" },
  { code: "wa", name: "Walloon", country: "🇧🇪" },
  { code: "cy", name: "Welsh", country: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
  { code: "wo", name: "Wolof", country: "🇸🇳" },
  { code: "fy", name: "Western Frisian", country: "🇳🇱" },
  { code: "xh", name: "Xhosa", country: "🇿🇦" },
  { code: "yi", name: "Yiddish", country: "🌍" },
  { code: "yo", name: "Yoruba", country: "🇳🇬" },
  { code: "za", name: "Zhuang", country: "🇨🇳" },
  { code: "zu", name: "Zulu", country: "🇿🇦" }
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    const selectedLang = africanLanguages.find(lang => lang.code === languageCode);
    toast.success(`Language changed to ${selectedLang?.name} ${selectedLang?.country}`);
  };

  const currentLanguage = africanLanguages.find(lang => lang.code === selectedLanguage);

  return (
    <Card className="p-4 border-0 shadow-md bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-3">
        <Globe className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold text-slate-800">Choose Your Language</h3>
      </div>
      
      <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-full border-purple-200 focus:border-purple-400">
          <SelectValue>
            <div className="flex items-center gap-2">
              <span className="text-lg">{currentLanguage?.country}</span>
              <span>{currentLanguage?.name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-60 bg-white border-purple-200">
          {africanLanguages.map((language) => (
            <SelectItem 
              key={language.code} 
              value={language.code}
              className="flex items-center gap-2 hover:bg-purple-50"
            >
              <div className="flex items-center gap-2 w-full">
                <span className="text-lg">{language.country}</span>
                <span className="flex-1">{language.name}</span>
                {selectedLanguage === language.code && (
                  <Check className="w-4 h-4 text-purple-600" />
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <p className="text-xs text-slate-500 mt-2">
        🌍 Supporting 80+ African languages for better learning
      </p>
    </Card>
  );
};

export default LanguageSelector;
