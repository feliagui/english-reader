import { useState } from 'react';

export function useSettings() {
  const [language, setLanguage] = useState('en-US');
  const [theme, setTheme] = useState('light');

  return {
    settings: {
      language,
      theme,
      rate: 0.95,
      pitch: 1,
      setLanguage,
      setTheme,
    },
  };
}
