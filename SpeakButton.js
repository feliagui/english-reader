import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SpeakButton({ onPress, disabled, isSpeaking }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled && { opacity: 0.4 },
        isSpeaking && { backgroundColor: '#FF3B30' },
      ]}
    >
      <Text style={styles.text}>
        {isSpeaking ? 'Stop' : 'Speak'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2D6CDF',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 50,
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
