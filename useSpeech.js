import * as Speech from 'expo-speech';

export function useSpeech() {
  const speak = (text, options = {}, onDone = () => {}) => {
    Speech.speak(text, {
      ...options,
      onDone,
    });
  };

  const stop = () => Speech.stop();

  return { speak, stop };
}
