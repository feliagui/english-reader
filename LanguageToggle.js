import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function LanguageToggle({ currentLanguage, onChange }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.option,
          currentLanguage === 'en-US' && styles.active,
        ]}
        onPress={() => onChange('en-US')}
      >
        <Text style={styles.text}>US</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          currentLanguage === 'en-GB' && styles.active,
        ]}
        onPress={() => onChange('en-GB')}
      >
        <Text style={styles.text}>UK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#EEE',
    padding: 4,
    borderRadius: 50,
  },
  option: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 50,
  },
  active: {
    backgroundColor: '#2D6CDF',
  },
  text: {
    color: '#000',
    fontWeight: '600',
  },
});
