// app/screens/HomeScreen.js
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Estos hooks y componentes los vamos a crear en los próximos pasos
import { useSpeech } from './useSpeech';
import { useFavorites } from './useFavorites';
import { useSettings } from './useSettings';
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

import LanguageToggle from './LanguageToggle';
import SpeakButton from './SpeakButton';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [title, setTitle] = useState('');

  const { speak, stop } = useSpeech();
  const { addFavorite } = useFavorites();
  const { settings } = useSettings(); 
  // settings: { language: 'en-US', rate: 0.95, pitch: 1, theme: 'light', bilingualMode: true }

  const canSpeak = useMemo(() => text.trim().length > 0, [text]);

  const handleSpeak = () => {
    if (!canSpeak) return;

    setIsSpeaking(true);

    speak(text, {
      language: settings.language || 'en-US',
      rate: settings.rate || 0.95,
      pitch: settings.pitch || 1,
    }, () => {
      // callback cuando termina
      setIsSpeaking(false);
    });
  };

  const handleStop = () => {
    stop();
    setIsSpeaking(false);
  };

  const handleSaveFavorite = () => {
    if (!text.trim()) return;

    addFavorite({
      id: Date.now().toString(),
      title: title.trim() || text.slice(0, 30) + (text.length > 30 ? '...' : ''),
      text: text.trim(),
      language: settings.language || 'en-US',
      createdAt: new Date().toISOString(),
    });

    // opcional: limpiar título
    setTitle('');
  };

  const handleQuickLanguageToggle = (langCode) => {
    // Aquí solo cambiamos el idioma de lectura rápido;
    // el hook useSettings manejará la persistencia
    settings.setLanguage && settings.setLanguage(langCode);
  };

  const isDark = settings.theme === 'dark';
  const themeStyles = getThemedStyles(isDark);

  return (
    <KeyboardAvoidingView
      style={[styles.container, themeStyles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={[styles.appTitle, themeStyles.appTitle]}>
              English Reader
            </Text>
            <Text style={[styles.appSubtitle, themeStyles.appSubtitle]}>
              Practica lectura y pronunciación con acento nativo
            </Text>
          </View>

          <LanguageToggle
            currentLanguage={settings.language || 'en-US'}
            onChange={handleQuickLanguageToggle}
          />
        </View>

        {/* CONTENIDO */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Campo de título opcional para favoritos */}
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, themeStyles.label]}>
              Título (opcional)
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Ej: Frase de saludo, diálogo 1, etc."
              placeholderTextColor={isDark ? '#777' : '#AAA'}
              style={[styles.input, themeStyles.input]}
            />
          </View>

          {/* Campo de texto principal */}
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, themeStyles.label]}>
              Texto para leer
            </Text>
            <View style={[styles.textAreaWrapper, themeStyles.textAreaWrapper]}>
              <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Escribe o pega aquí tu texto en inglés..."
                placeholderTextColor={isDark ? '#777' : '#AAA'}
                style={[styles.textArea, themeStyles.textArea]}
                multiline
                textAlignVertical="top"
              />
              {text.length > 0 && (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => setText('')}
                >
                  <Ionicons
                    name="close-circle"
                    size={22}
                    color={isDark ? '#AAA' : '#888'}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Info rápida del idioma actual */}
          <View style={styles.languageInfoContainer}>
            <Ionicons
              name="globe-outline"
              size={18}
              color={isDark ? colors.primaryLight : colors.primary}
            />
            <Text style={[styles.languageInfoText, themeStyles.languageInfoText]}>
              Idioma de lectura actual:{' '}
              {settings.language === 'en-GB' ? 'Inglés británico' : 'Inglés americano'}
            </Text>
          </View>
        </ScrollView>

        {/* ACCIONES INFERIORES */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[
              styles.iconButton,
              !text.trim() && styles.iconButtonDisabled,
            ]}
            onPress={handleSaveFavorite}
            disabled={!text.trim()}
          >
            <Ionicons
              name="star-outline"
              size={22}
              color={!text.trim() ? '#AAA' : colors.accent}
            />
            <Text style={[styles.iconButtonText, themeStyles.iconButtonText]}>
              Guardar
            </Text>
          </TouchableOpacity>

          <SpeakButton
            disabled={!canSpeak}
            isSpeaking={isSpeaking}
            onPress={isSpeaking ? handleStop : handleSpeak}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const getThemedStyles = (isDark) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDark ? colors.backgroundDark : colors.background,
    },
    appTitle: {
      color: isDark ? colors.textLight : colors.text,
    },
    appSubtitle: {
      color: isDark ? '#AAA' : '#666',
    },
    label: {
      color: isDark ? colors.textLight : colors.text,
    },
    input: {
      backgroundColor: isDark ? '#222' : '#F7F7F7',
      color: isDark ? colors.textLight : colors.text,
      borderColor: isDark ? '#333' : '#DDD',
    },
    textAreaWrapper: {
      backgroundColor: isDark ? '#222' : '#F7F7F7',
      borderColor: isDark ? '#333' : '#DDD',
    },
    textArea: {
      color: isDark ? colors.textLight : colors.text,
    },
    languageInfoText: {
      color: isDark ? '#CCC' : '#555',
    },
    iconButtonText: {
      color: isDark ? '#DDD' : '#444',
    },
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingTop: spacing.xxxl,
    paddingHorizontal: spacing.lg,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  appTitle: {
    fontSize: typography.title,
    fontWeight: '700',
  },
  appSubtitle: {
    marginTop: 4,
    fontSize: typography.body,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  fieldContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.caption,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.body,
  },
  textAreaWrapper: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    position: 'relative',
    minHeight: 150,
  },
  textArea: {
    fontSize: typography.body,
    flex: 1,
  },
  clearButton: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
  },
  languageInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  languageInfoText: {
    marginLeft: 6,
    fontSize: typography.caption,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: 'transparent',
  },
  iconButtonDisabled: {
    opacity: 0.4,
  },
  iconButtonText: {
    marginLeft: 4,
    fontSize: typography.caption,
  },
});
