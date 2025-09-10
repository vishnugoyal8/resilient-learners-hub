import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GlobeAltIcon, 
  LanguageIcon,
  SpeakerWaveIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', speakers: '1.5B+' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speakers: '600M+' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', speakers: '300M+' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', speakers: '95M+' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', speakers: '83M+' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', speakers: '78M+' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', speakers: '70M+' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', speakers: '56M+' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', speakers: '44M+' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', speakers: '38M+' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', speakers: '38M+' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', speakers: '33M+' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳', speakers: '15M+' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵', speakers: '16M+' }
];

const features = [
  {
    icon: DocumentTextIcon,
    title: 'Text Translation',
    description: 'All educational content, alerts, and instructions are available in your preferred language with accurate translations.'
  },
  {
    icon: SpeakerWaveIcon,
    title: 'Audio Support',
    description: 'Voice narration and audio instructions in multiple languages for better accessibility and comprehension.'
  },
  {
    icon: GlobeAltIcon,
    title: 'Cultural Adaptation',
    description: 'Content adapted to local cultural contexts and regional disaster patterns for more relevant learning.'
  }
];

const MultilingualSupport = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleLanguageChange = (languageCode: string) => {
    setIsTranslating(true);
    // Simulate translation process
    setTimeout(() => {
      setSelectedLanguage(languageCode);
      setIsTranslating(false);
    }, 1000);
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  return (
    <section id="multilingual" className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gradient-hero sm:text-4xl mb-4">
            Multilingual Support
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Breaking language barriers to ensure disaster preparedness education reaches everyone. 
            Our platform supports multiple Indian languages and international languages for global accessibility.
          </p>
        </motion.div>

        {/* Language Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="disaster-card max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center mx-auto mb-4">
                <LanguageIcon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl">Choose Your Language</CardTitle>
              <CardDescription>
                Select your preferred language for the best learning experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-4 mb-6">
                {currentLanguage && (
                  <div className="flex items-center space-x-3 p-4 bg-accent rounded-lg">
                    <span className="text-3xl">{currentLanguage.flag}</span>
                    <div>
                      <div className="font-semibold">{currentLanguage.nativeName}</div>
                      <div className="text-sm text-muted-foreground">{currentLanguage.name}</div>
                    </div>
                  </div>
                )}
              </div>

              <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center space-x-3">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                        <span className="text-muted-foreground">({lang.name})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {isTranslating && (
                <div className="mt-4 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">Translating content...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Language Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Supported Languages</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.code}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedLanguage === lang.code 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border bg-card hover:border-primary/50'
                }`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{lang.flag}</div>
                  <div className="font-semibold text-sm">{lang.nativeName}</div>
                  <div className="text-xs text-muted-foreground">{lang.name}</div>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {lang.speakers}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="disaster-card h-full text-center">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-xl bg-gradient-hero flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Accessibility Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="disaster-card">
            <CardContent className="pt-8">
              <div className="text-center max-w-4xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-gradient-safety flex items-center justify-center mx-auto mb-6">
                  <GlobeAltIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Inclusive Disaster Education</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  We believe that disaster preparedness education should be accessible to everyone, regardless of language or literacy level. 
                  Our multilingual platform ensures that critical safety information reaches every community member in their preferred language.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">14+</div>
                    <div className="text-sm text-muted-foreground">Languages Supported</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary mb-2">2B+</div>
                    <div className="text-sm text-muted-foreground">People Reached</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-response mb-2">98%</div>
                    <div className="text-sm text-muted-foreground">Translation Accuracy</div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button className="btn-primary">
                    Request New Language
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default MultilingualSupport;