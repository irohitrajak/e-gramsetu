import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceAssistant = ({ currentLanguage }) => {
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const content = {
    hi: {
      title: 'आवाज सहायक',
      subtitle: 'बोलकर नेविगेट करें',
      startListening: 'सुनना शुरू करें',
      stopListening: 'सुनना बंद करें',
      playInstructions: 'निर्देश सुनें',
      voiceCommands: 'आवाज कमांड',
      examples: [
        '"नौकरी खोजें" - नौकरी खोज पेज खोलें',
        '"योजनाएं दिखाएं" - सरकारी योजनाओं की सूची',
        '"प्रोफाइल खोलें" - अपनी प्रोफाइल देखें',
        '"सहायता चाहिए" - हेल्प सेक्शन खोलें'
      ],
      tip: 'स्पष्ट और धीरे बोलें। हिंदी और अंग्रेजी दोनों भाषाओं में कमांड दे सकते हैं।'
    },
    en: {
      title: 'Voice Assistant',
      subtitle: 'Navigate by speaking',
      startListening: 'Start Listening',
      stopListening: 'Stop Listening',
      playInstructions: 'Play Instructions',
      voiceCommands: 'Voice Commands',
      examples: [
        '"Find jobs" - Open job search page',
        '"Show schemes" - List government schemes',
        '"Open profile" - View your profile',
        '"Need help" - Open help section'
      ],
      tip: 'Speak clearly and slowly. You can give commands in both Hindi and English.'
    }
  };

  const currentContent = content?.[currentLanguage] || content?.en;

  const handleStartListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      // Mock voice command processing
      alert(currentLanguage === 'hi' ?'आवाज कमांड प्राप्त हुई। यह एक डेमो है।' :'Voice command received. This is a demo.'
      );
    }, 3000);
  };

  const handleStopListening = () => {
    setIsListening(false);
  };

  const handlePlayInstructions = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 5000);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            {currentContent?.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {currentContent?.subtitle}
          </p>
        </div>
        <Icon name="Mic" size={24} className="text-accent" />
      </div>
      <div className="space-y-6">
        {/* Voice Control Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant={isListening ? "destructive" : "default"}
            onClick={isListening ? handleStopListening : handleStartListening}
            disabled={isPlaying}
            className="flex-1"
          >
            <Icon 
              name={isListening ? "MicOff" : "Mic"} 
              size={20} 
              className="mr-2" 
            />
            {isListening ? currentContent?.stopListening : currentContent?.startListening}
          </Button>
          
          <Button
            variant="outline"
            onClick={handlePlayInstructions}
            disabled={isListening}
            className="flex-1"
          >
            <Icon 
              name={isPlaying ? "Pause" : "Play"} 
              size={20} 
              className="mr-2" 
            />
            {currentContent?.playInstructions}
          </Button>
        </div>

        {/* Listening Indicator */}
        {isListening && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-pulse">
                <Icon name="Mic" size={16} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">
                  {currentLanguage === 'hi' ? 'सुन रहा हूं...' : 'Listening...'}
                </p>
                <p className="text-xs text-primary/80">
                  {currentLanguage === 'hi' ? 'अपना कमांड बोलें' : 'Speak your command'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Playing Indicator */}
        {isPlaying && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                <Icon name="Volume2" size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">
                  {currentLanguage === 'hi' ? 'निर्देश चल रहे हैं...' : 'Playing instructions...'}
                </p>
                <p className="text-xs text-blue-600">
                  {currentLanguage === 'hi' ? 'ध्यान से सुनें' : 'Listen carefully'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Voice Commands Guide */}
        <div className="bg-background border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="MessageSquare" size={16} />
            {currentContent?.voiceCommands}
          </h3>
          <div className="space-y-2">
            {currentContent?.examples?.map((example, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <Icon name="ArrowRight" size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{example}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tip */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                {currentLanguage === 'hi' ? 'सुझाव' : 'Tip'}
              </p>
              <p className="text-xs text-muted-foreground">
                {currentContent?.tip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;